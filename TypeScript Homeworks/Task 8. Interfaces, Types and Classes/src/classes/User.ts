import { IUser } from '../interfaces/user.interfaces';
import { BaseUser } from './BaseUser';

export class User extends BaseUser {
    private _firstName: string;
    private _lastName: string;

    public constructor(user: IUser) {
        super(user);
        this._firstName = user.name.split(' ')[0];
        this._lastName = user.name.split(' ')[1];
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

