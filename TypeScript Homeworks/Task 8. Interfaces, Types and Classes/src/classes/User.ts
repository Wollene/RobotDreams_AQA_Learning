import { BaseUser } from './BaseUser';

export class User extends BaseUser {
    private _firstName: string;
    private _lastName: string;
    private name: string;
    private username: string;
    private address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: number;
            lng: number;
        }
    };
    private company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };

    public constructor(user: User) {
        super();
        this._firstName = user.name.split(' ')[0];
        this._lastName = user.name.split(' ')[1];
        this.name = user.name;
        this.username = user.username;
        this.address = user.address;
        this.address.street = user.address.street;
        this.address.suite = user.address.suite;
        this.address.city = user.address.city;
        this.address.zipcode = user.address.zipcode;
        this.address.geo = user.address.geo;
        this.address.geo.lat = user.address.geo.lat;
        this.address.geo.lng = user.address.geo.lng;
        this.company = user.company;
        this.company.name = user.company.name;
        this.company.name = user.company.catchPhrase;
        this.company.bs = user.company.catchPhrase;
    }

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(name: string) {
        if (name === '') {
            throw new Error('First name cannot be empty.');
        }
        this._firstName = name;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(surname: string) {
        if (surname === '') {
            throw new Error('Last name cannot be empty.');
        }
        this.lastName = surname;
    }

    public getFullName(): string {
        return `Legal Name: ${this._firstName} ${this._lastName}
            \rNickname: ${this.username}
            \rID: ${this.id}`;
    }

    public getAddressInfo(): string {
        return `City: ${this.address.city}
            \rStreet: ${this.address.street}
            \rSuite: ${this.address.suite}, ${this.address.zipcode}
            \rLocation: ${this.address.geo.lat},${this.address.geo.lng}`;
    }

    public getCompanyInfo(): string {
        return `Company Name: ${this.company.name}
            \rDescription: ${this.company.catchPhrase}
            \rMarket: ${this.company.bs}`;
    }
}

