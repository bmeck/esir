import Operation from '../Operation';
import Literal from '../Literal';
export default {
	*walk(node, context) {
        // where this junk is gonna go
		const envs = [...context.stacks.get('env')];
    const kind = node.kind;
    let target_env = null;
    let i = envs.length - 1;
    for (; i >= 0; i--) {
        target_env = envs[i];
        if (kind === 'let' || kind === 'const') {
            break;
        }
        else if (kind === 'var') {
            if (target_env.type === 'global'
            || target_env.type === 'module'
            || target_env.type === 'function') {
                break;
            }
        }
    }
    if (i === -1) {
        throw new EvalError(`unknown variable declaration kind ${kind}`);
    }
		for (let declarator of node.declarations) {
      const ref = context.ref(target_env, context.literal(declarator.id.name));
      context.op(new Operation(
          kind !== 'const' ?
              '[[CreateMutableBinding]]' :
              '[[CreateImmutableBinding]]',
          undefined,
          ref
      ));
      if (declarator.init) {
        yield declarator.init;
        context.op(new Operation('[[PutValue]]', context.tmp(), ref, context.lastSSA()));
      }
		}
	}
};