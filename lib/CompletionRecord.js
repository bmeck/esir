let uuid = 0;
export default class CompletionRecord {
	constructor(type, value) {
        this.type = type;
        this.value = value;
        this.target = undefined;
	}
    toString() {
        return `CompletionRecord(type=${this.type} value=${this.value})`;
    }
}