import Operation from '../Operation';
import List from '../List';
export default {
	*walk(node, context) {
		yield node.callee;
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
		context.op(new Operation('[[EvaluateNew]]', context.tmp(), callee, list));
		context.returnIfAbrupt();
	}
};