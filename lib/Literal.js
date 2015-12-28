export default class Literal {
	constructor(v) {
		this.v = v;
	}
	toString() {
		return `Literal(${JSON.stringify(this.v)})`;
	}
};