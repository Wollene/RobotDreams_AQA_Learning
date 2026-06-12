import * as sinon from 'sinon';
import { expect } from 'chai';
import { User } from '../../../Task 8. Interfaces, Types and Classes/src/classes/User';
import { getUser } from '../../../Task 8. Interfaces, Types and Classes/src/services/api.services';

const mockUser = {
    id: 1,
    name: 'Example User',
    username: 'exampleuser',
    email: 'user@example.com',
    phone: '111-2345',
    website: 'example.com',
    address: {
        street: 'Example St',
        suite: 'Apt 1',
        city: 'Example City',
        zipcode: '12345',
        geo: { lat: 40.7128, lng: -74.006 }
    },
    company: {
        name: 'Example Corp',
        catchPhrase: 'Example Phrase',
        bs: 'example dummy something'
    }
};

describe('getUser() Verification:', () => {
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    it('getUser() should be called ONCE with a correct URL', async () => {
        fetchStub.resolves({ json: sinon.stub().resolves(mockUser) });
        await getUser(globalThis.url);
        expect(fetchStub.calledOnceWithExactly(globalThis.url)).to.be.true;
    });

    it('getUser() returns an instance of a User Class', async () => {
        fetchStub.resolves({ json: sinon.stub().resolves(mockUser) });
        const user = await getUser(globalThis.url);
        expect(user).to.be.instanceOf(User);
    });

    it('getUser() response properties should have correct data types and values', async () => {
        fetchStub.resolves({ json: sinon.stub().resolves(mockUser) });
        const user = await getUser(globalThis.url);
        expect(user.id).to.be.a('number').and.to.be.equal(1);
        expect(user.name).to.be.a('string').and.to.be.equal('Example User');
        expect(user.username).to.be.a('string').and.to.be.equal('exampleuser');
        expect(user.email).to.be.a('string').and.to.be.equal('user@example.com');
        expect(user.phone).to.be.a('string').and.to.be.equal('111-2345');
        expect(user.website).to.be.a('string').and.to.be.equal('example.com');
        expect(user.address).to.be.an('object').and.to.have.all.keys(['street', 'suite', 'city', 'zipcode', 'geo']);
        expect(user.company).to.be.an('object').and.to.have.all.keys(['name', 'catchPhrase', 'bs']);
    });

    it('getUser() should throw an error in case of failed Promise', async () => {
        fetchStub.rejects(new Error('Network error.'));
        try {
            await getUser(globalThis.url);
            expect.fail('Expected Promise fail.');
        } catch (err) {
            expect((err as Error).message).to.be.equal('Failed to send a request.');
        }
    });
});

describe('User Class Verification:', () => {
    let user: User;
    let userGetFullNameSpy: sinon.SinonSpy;
    let userGetAddressInfoSpy: sinon.SinonSpy;
    let userGetCompanyInfoSpy: sinon.SinonSpy;

    beforeEach(() => {
        user = new User(mockUser);
        userGetFullNameSpy = sinon.spy(user, 'getFullName');
        userGetAddressInfoSpy = sinon.spy(user, 'getAddressInfo');
        userGetCompanyInfoSpy = sinon.spy(user, 'getCompanyInfo');
    });

    afterEach(() => {
        userGetFullNameSpy.restore;
        userGetAddressInfoSpy.restore;
        userGetCompanyInfoSpy.restore;
    });

    it('User.getFullName() got called ONCE with a correct value', () => {
        const fullName = user.getFullName();
        expect(userGetFullNameSpy.calledOnce);
        expect(userGetFullNameSpy.returnValues[0]).to.be.equal(fullName);
    });

    it('User.getAddressInfo() got called ONCE with a correct value', () => {
        const addressInfo = user.getAddressInfo();
        expect(userGetAddressInfoSpy.calledOnce);
        expect(userGetAddressInfoSpy.returnValues[0]).to.be.equal(addressInfo);
    });

    it('User.getCompanyInfo() got called ONCE with a correct value', () => {
        const companyInfo = user.getCompanyInfo();
        expect(userGetCompanyInfoSpy.calledOnce);
        expect(userGetCompanyInfoSpy.returnValues[0]).to.be.equal(companyInfo);
    });
});
