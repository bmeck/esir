export default class SSA {
	// local - can be discarded at end of code block
	constructor(name, local = true) {
		this.name = name;
		this.local = local;
		this.instances = 0;
	}
	getInstance(value) {
		return new SSAInstance(this.name, this.instances++);
	}
    static isSSA(o) {
        return o instanceof SSAInstance;
    }
}
class SSAInstance {
	constructor(name, instance, value) {
		this.name = name;
		this.instance = instance;
	}
	toString() {
		return `SSA(${this.name}.${this.instance})`;
	}
}