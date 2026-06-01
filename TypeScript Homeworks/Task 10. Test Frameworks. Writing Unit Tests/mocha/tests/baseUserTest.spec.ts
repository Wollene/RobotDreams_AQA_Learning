import { User } from '../../../Task 8. Interfaces, Types and Classes/src/classes/User';
import { expect } from 'chai';

describe('User Class Tests:', () => {

    describe('Verify User is Created', () => {
        it('User is not \'undefined\'', () => {
            expect(globalThis.user).to.be.instanceof(User);
        });
    });

    describe('Verify All User Class Property Values Have Proper Types', () => {
        it('\'firstName\' is \'string\'', () => {
            expect(globalThis.user.firstName).to.be.a('string');
        });
        it('\'lastName\' is \'string\'', () => {
            expect(globalThis.user.lastName).to.be.a('string');
        });
        it('\'id\' is \'number\'', () => {
            expect(globalThis.user.id).to.be.a('number');
        });
    });

    describe('Verify getFullName() Returns String', () => {
        it('getFullName() is \'string\'', () => {
            const fullName = globalThis.user.getFullName();
            expect(fullName).to.be.a('string');
        });
    });

    describe('Verify getAddressInfo() Returns String', () => {
        it('getAddressInfo() is \'string\'', () => {
            const address = globalThis.user.getAddressInfo();
            expect(address).to.be.a('string');
        });
    });

    describe('Verify getCompanyInfo() Returns String', () => {
        it('getCompanyInfo() is \'string\'', () => {
            const company = globalThis.user.getCompanyInfo();
            expect(company).to.be.a('string');
        });
    });
});
