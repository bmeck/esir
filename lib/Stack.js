export default class Stack {
	constructor(init = []) {
		this._back = [...init];
	}
	[Symbol.iterator]() {
		return this._back[Symbol.iterator]();
	}
	swap(v) {
		this.pop();
		this.push(v);
	}
	push(v) {
		this._back.push(v);
	}
	size() {
		return this._back.length;
	}
	pop() {
		this._back.pop();
	}
	peek() {
		return this._back[this.size()-1];
	}
}