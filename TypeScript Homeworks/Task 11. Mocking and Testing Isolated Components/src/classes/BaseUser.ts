import { IUser } from '../interfaces/user.interfaces';

export abstract class BaseUser implements IUser {
    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public phone: string;
    public website: string;
    public address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: number;
            lng: number;
        }
    };
    public company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };

    public constructor(user: IUser) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.website = user.website;
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

    public abstract getFullName(): string;
    public abstract getAddressInfo(): string;
    public abstract getCompanyInfo(): string;
}
