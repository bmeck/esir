import FunctionExpression from './FunctionExpression';
import VariableDeclaration from './VariableDeclaration';
import Operation from '../Operation';
export default {
	*walk(node, context) {
		const target_env = [...context.stacks.get('env')][0];
		const ssa = yield* FunctionExpression.walk(node, context);
    const ref = context.ref(target_env, context.literal(node.name));
    context.op(new Operation(
        '[[CreateMutableBinding]]',
        undefined,
        ref
    ));
    context.op(new Operation('[[PutValue]]', context.tmp(), ref, ssa));
	}
};