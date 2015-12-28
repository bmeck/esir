import Operation from '../Operation';
import Literal from '../Literal';
import Reference from '../Reference';
export default {
	*walk(node, context) {
		const purpose = context.stacks.get('identifier_purpose').peek();
		if (purpose === 'get') {
			const op = new Operation('[[GetValue]]', context.tmp(), context.ref(undefined, new Literal(node.name)));
		    context.op(op);
		}
        // need to return a ref
		else if (purpose === 'ref') {
			const op = new Operation('reference', context.tmp(), context.ref(undefined, new Literal(node.name)));
		    context.op(op);
		}
        else throw new EvalError(`Unknown identifier purpose ${purpose}`);
	}
};