import Operation from '../Operation';
import EnvironmentRecord from '../EnvironmentRecord';
export default {
	*walk(node, context) {
        yield* context.env('block', function*() {
            for (let statement of node.body) {
                yield statement;
            }
        });
	}
};