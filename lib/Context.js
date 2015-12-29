import Stack from './Stack';
import SSA from './SSA';
import Literal from './Literal';
import Operation from './Operation';
import CompletionRecord from './CompletionRecord';
import Reference from './Reference';
import Environment from './EnvironmentRecord';
export default class CompilerContext {
	constructor() {
		this.stacks = new Map([
			['block',new Stack()],
			['identifier_purpose', new Stack()],
			['env',new Stack()]
		]);
		this.unresolved_references = [];
		this.ssas = new Map();
	}
    env(type, actions) {
        var ctx = this;
        return function* () {
            const ssa = ctx.tmp();
            const env = new Environment(
                type
            );
            ctx.op(new Operation('environment', ssa, env));
            if (typeof actions === 'function') actions = actions();
            ctx.stacks.get('env').push(env);
            ctx.op(new Operation('%PushEnv', undefined, ssa));
            yield* actions;
            ctx.op(new Operation('%PopEnv', undefined, ssa));
            ctx.stacks.get('env').pop();
            return ssa;
        }();
    }
    complete(type, value) {
        const ssa = this.tmp();
        const rec = new CompletionRecord(
            type,
            value
        );
        this.op(new Operation('completion', ssa, rec));
        return ssa;
    }
    op(operation) {
        this.stacks.get('block').peek().operations.push(operation);
    }
    ref(holder = this.stacks.get('env').peek(), prop) {
        const ssa = this.tmp();
        this.op(new Operation('reference', ssa, new Reference(
            holder,
            prop
        )));
        return ssa;
    }
    literal(v) {
        const ssa = this.tmp();
        this.op(new Operation('literal', ssa, new Literal(v)));
        return ssa;
    }
    tmp() {
        return this.ssa("%tmp");
    }
    branch(onTrue, onFalse) {
		return this.stacks.get('block').peek().branch(onTrue, onFalse);
    }
    lastSSA() {
		return this.stacks.get('block').peek().operations.slice(-1)[0].return;
    }
	returnIfAbrupt() {
		const block = this.stacks.get('block').peek();
		block.returnIfAbrupt(this);
	}
	ssa(name) {
		if (!this.ssas.has(name)) {
			this.ssas.set(name, new SSA(name));
		}
		return this.ssas.get(name).getInstance();
	}
}