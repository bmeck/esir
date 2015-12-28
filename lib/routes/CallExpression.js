import Operation from '../Operation';
import List from '../List';
export default {
	*walk(node, context) {
		context.stacks.get('identifier_purpose').push('ref');
		yield node.callee;
		context.stacks.get('identifier_purpose').pop();
		context.returnIfAbrupt();
        const callee = context.lastSSA();
        const args = [];
		for (let arg of node.arguments) {
            yield arg;
		    context.returnIfAbrupt();
            args.push(context.lastSSA());
        }
		const list = context.tmp();
		context.op(new Operation('list', list, new List(args)));
		context.op(new Operation('[[EvaluateCall]]', context.tmp(), callee, list));
		context.returnIfAbrupt();
	}
};