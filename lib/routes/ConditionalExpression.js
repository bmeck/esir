import Operation from '../Operation';
import Block from '../Block';
export default {
	*walk(node, context) {
		yield node.test;
		const block_true = new Block();
		const block_false = new Block();
		const block_join = new Block();
		
		let phi1;
		let phi2;
		context.returnIfAbrupt();
		let cnd = context.lastSSA();
		const bool_res = context.tmp();
		context.op(new Operation('[[ToBoolean]]', bool_res, cnd));
		context.returnIfAbrupt();
		context.branch(block_true, block_false);
		{
			context.stacks.get('block').swap(block_true);
			yield node.consequent;
			context.returnIfAbrupt();
			const tmp = context.lastSSA();
			context.op(new Operation('[[GetValue]]', context.tmp(), tmp));
			context.returnIfAbrupt();
            phi1 = context.lastSSA();
			context.branch(block_join, block_join);
		}
		{
			context.stacks.get('block').swap(block_false);
			yield node.alternate;
			context.returnIfAbrupt();
			const tmp = context.lastSSA();
			context.op(new Operation('[[GetValue]]', context.tmp(), tmp));
			context.returnIfAbrupt();
            phi2 = context.lastSSA();
			context.branch(block_join, block_join);
		}
		{
			context.stacks.get('block').swap(block_join);
			// grab the last var from either block
			context.op(new Operation('phi', context.tmp(), phi1, phi2));
		}
	}
}