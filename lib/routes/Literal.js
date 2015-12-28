import Operation from '../Operation';
import Literal from '../Literal';
export default {
	*walk(node, context) {
		const phi = context.tmp();
		const op = new Operation('literal', phi, new Literal(node.value));
		context.op(op);
	}
};