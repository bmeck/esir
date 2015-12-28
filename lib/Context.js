import Stack from './Stack';
import SSA from './SSA';
import Literal from './Literal';
import Reference from './Reference';
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
    op(operation) {
        this.stacks.get('block').peek().operations.push(operation);
    }
    ref(holder = this.stacks.get('env').peek(), prop) {
        return new Reference(
            holder,
            prop
        );
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