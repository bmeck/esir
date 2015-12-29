import Operation from '../Operation';
export default {
	*walk(node, context) {
		context.stacks.get('identifier_purpose').push('ref');
		yield node.left;
		context.stacks.get('identifier_purpose').pop();
        const ref = context.lastSSA();
		yield node.right;
		context.returnIfAbrupt();
        const val = context.lastSSA();
        context.op(new Operation('[[PutValue]]', context.tmp(), ref, val));
		context.returnIfAbrupt();
        context.op(new Operation('value', val));
	}
};