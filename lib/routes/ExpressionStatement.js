export default {
	*walk(node, context) {
		yield node.expression;
	}
};