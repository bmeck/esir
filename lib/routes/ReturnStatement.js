import Operation from '../Operation';
export default {
	*walk(node, context) {
        yield node.argument;
		context.op(new Operation('[[Return]]', undefined, context.complete('return', context.lastSSA())));
	}
};