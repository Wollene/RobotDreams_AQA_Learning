export abstract class BaseUser {
    public id: number;
    public constructor() {
        this.id = Math.floor(Math.random() * 1000);
    }
}
