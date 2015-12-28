import Operation from '../Operation';
import EnvironmentRecord from '../EnvironmentRecord';
export default {
	*walk(node, context) {
		context.stacks.get('env').push(new EnvironmentRecord('block'));
		for (let statement of node.body) {
			yield statement;
		}
	}
};