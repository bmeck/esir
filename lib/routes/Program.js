import Operation from '../Operation';
import EnvironmentRecord from '../EnvironmentRecord';
export default {
	*walk(node, context) {
        context.op(new Operation('[[InitializeHostDefinedRealm]]', context.tmp()));
		context.stacks.get('env').push(new EnvironmentRecord('global'));
		context.stacks.get('identifier_purpose').push('get');
		for (let statement of node.body) {
			yield statement;
		}
		context.stacks.get('identifier_purpose').pop();
	}
};