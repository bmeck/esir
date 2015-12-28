import Operation from '../Operation';
export default {
	*walk(node, context) {
		const purpose = context.stacks.get('identifier_purpose').peek();
		context.stacks.get('identifier_purpose').push('get');
        if (purpose === 'get') {
          yield node.object;
          const obj = context.lastSSA();
          let key;
          if (node.computed) {
             yield node.property;
             key = context.lastSSA();
          }
          else {
             key = context.tmp();
             context.op(new Operation('literal', key, node.property.name));
          }
          const ref = context.tmp();
          context.op(new Operation('reference', ref, context.ref(obj, key)));
          context.op(new Operation('[[GetValue]]', context.tmp(), ref));
        }
        else if (purpose === 'ref') {
          yield node.object;
          const obj = context.lastSSA();
          let key;
          if (node.computed) {
             yield node.property;
             key = context.lastSSA();
          }
          else {
             key = context.tmp();
             context.op(new Operation('literal', key, node.property.name));
          }
          const ref = context.tmp();
          context.op(new Operation('reference', ref, context.ref(obj, key)));
        }
        else throw new EvalError(`Unknown identifier purpose ${purpose}`);
		context.stacks.get('identifier_purpose').pop();
	}
};