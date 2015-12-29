let uuid = 0;
export default class DeclarativeEnvironmentRecord {
	constructor(type, owner) {
        this.type = type;
        this.owner = owner;
        this.id = ++uuid;
	}
    toString() {
        return `EnvironmentRecord(id=${this.id} type=${this.type}` + (this.owner?` owner=${this.owner.id})`:'');
    }
}