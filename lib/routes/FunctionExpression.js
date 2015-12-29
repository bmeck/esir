import Block from '../Block';
import Operation from '../Operation';
export default {
	*walk(node, context) {
		const block_fn = new Block();
        context.op(new Operation('function', context.tmp(), block_fn));
		const current_block = context.stacks.get('block').peek();
		context.stacks.get('block').swap(block_fn);
        console.log(node.body)
        yield* context.env('function', function* () {
            for (const statement of node.body.body) {
                yield statement;
            }
        });
        context.stacks.get('block').swap(current_block);
	}
};