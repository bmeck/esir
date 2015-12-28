export default class DeclarativeEnvironmentRecord {
	constructor(type) {
        this.type = type;
	}
    toString() {
        return `EnvironmentRecord(${this.type})`;
    }
}