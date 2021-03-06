import Operation from './Operation';

let uuid = 1;
let all = [];
export default class Block {
	constructor() {
		this.id = uuid++;
		this.operations = [];
		this._closed = false;
		this.jmpTrue;
		this.jmpFalse;
        all.push(this);
	}
    static _all() {
        return all;
    }
	_checkedMutate() {
		if (this._closed) {
			throw new Error('Block is closed; branch is already defined');
		}
	}
	returnIfAbrupt(ctx) {
		this.push(new Operation(
			'[[ReturnIfAbrupt]]',
			ctx.ssa('%tmp'),
			this.operations.slice(-1)[0].return
		));
	}
	toString(expand=false) {
		const ops = this.operations;
		let ret = `Block::${this.id}`;
        if (expand) {
            ret += `=>\n  `
            +`${
                ops.join('\n  ')
            }`;
            if (this.jmpTrue) {
                ret += `\n  jmp ${this.jmpTrue.id} ${this.jmpFalse.id}\n`;
            }
        }
		return ret;
	}
	branch(onTrue, onFalse) {
		this._checkedMutate();
		this.jmpTrue = onTrue;
		this.jmpFalse = onFalse;
		this._closed = true;
	}
	push(op) {
		this._checkedMutate();
		this.operations.push(op);
	}
}