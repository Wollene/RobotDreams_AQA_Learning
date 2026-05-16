const userProfile = {
    userDetails: {
        firstName: 'Example',
        lastName: 'Example',
        age: 27
    },
    contact: {
        email: 'example@gmail.com',
        phone: '+380000000000'
    },
    address: {
        country: 'Ukraine',
        city: 'Lviv'
    },
    skills: ['Writing', 'Singing', 'Anything Else'],
    subscription: true,
    get firstName() {
        return this.userDetails.firstName;
    },
    set firstName(firstName) {
        if (firstName === undefined) {
            console.log('Value provided as \'firstName\' is invalid.');
            return;
        }
        this.userDetails.firstName = firstName;
    },
    get lastName() {
        return this.userDetails.lastName;
    },
    set lastName(lastName) {
        if (lastName === undefined) {
            console.log('Value provided as \'lastName\' is invalid.');
            return;
        }
        this.userDetails.lastName = lastName;
    },
    get age() {
        return this.userDetails.age;
    },
    getUserDetails() {
        return `First Name: ${this.firstName},\nLast Name: ${this.lastName},\nAge: ${this.age}`;
    }
};

console.log(`User Details Before Setting:
${userProfile.getUserDetails()}`);

userProfile.firstName = 'Oleksandr';
userProfile.lastName = 'Chupikov';

console.log(`\nUser Details After Setting:
${userProfile.getUserDetails()}`);
