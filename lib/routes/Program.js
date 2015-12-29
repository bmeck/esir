import Operation from '../Operation';
import EnvironmentRecord from '../EnvironmentRecord';
export default {
	*walk(node, context) {
        yield* context.env('global', function*() {
            context.op(new Operation('[[InitializeHostDefinedRealm]]', context.tmp()));
            context.stacks.get('identifier_purpose').push('get');
            for (let statement of node.body) {
                yield statement;
            }
            context.stacks.get('identifier_purpose').pop();
        });
	}
};