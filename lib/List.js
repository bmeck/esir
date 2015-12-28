export default class List {
	constructor(v) {
		this.v = [...v];
	}
	toString() {
		return `List(${this.v.join(' ')})`;
	}
};