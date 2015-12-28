import Operation from '../Operation';
import Block from '../Block';
export default {
	*walk(node, context) {
		yield node.test;
		const block_true = new Block();
		const block_join = new Block();
		
		context.returnIfAbrupt();
		let cnd = context.lastSSA();
		const bool_res = context.tmp();
		context.op(new Operation('[[ToBoolean]]', bool_res, cnd));
		context.returnIfAbrupt();
        if (node.alternate) {
		  const block_false = new Block();
		  context.branch(block_true, block_false);
          
          context.stacks.get('block').swap(block_false);
          yield node.alternate;
          context.returnIfAbrupt();
          context.branch(block_join, block_join);
        }
        else {
            context.branch(block_true, block_join);
        }
		{
			context.stacks.get('block').swap(block_true);
			yield node.consequent;
			context.returnIfAbrupt();
			context.branch(block_join, block_join);
		}
		{
			context.stacks.get('block').swap(block_join);
		}
	}
}