import SSA from './SSA';
export default class Operation {
	constructor(name, return_phi, ...argument_phis) {
		this.name = name;
		this.return = return_phi;
        if (return_phi !== undefined && SSA.isSSA(return_phi) !== true) {
            throw new Error('All Operation returns must be SSA');
        }
		this.arguments = argument_phis;
        for (let arg of this.arguments) {
            if (SSA.isSSA(arg) !== true) {
                //throw new Error('All Operation arguments must be SSA');
            }
        }
	}
	toString() {
		let ret = `${this.name}`;
		if (this.arguments.length) {
			ret += ` ${this.arguments.join(' ')}`;
		}
		if (this.return !== undefined) {
			ret = `${this.return} = ` + ret;
		}
		return ret; 
	}
}