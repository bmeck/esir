export default class Reference {
	constructor(base, name) {
		this.base = base;
		this.name = name;
	}
	toString() {
		return `Reference(${this.base} :: ${this.name})`;
	}
}