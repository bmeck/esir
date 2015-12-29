import Operation from '../Operation';
export default {
	*walk(node, context) {
		context.literal(node.value);
	}
};