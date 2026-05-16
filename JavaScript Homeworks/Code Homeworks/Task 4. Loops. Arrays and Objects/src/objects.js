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
    changeName(newName) {
        this.userDetails.firstName = newName;
        console.log(`The name has been changed successfully!\nNew name: ${this.userDetails.firstName}.`);
    }
};

if (userProfile.userDetails.age > 18) {
    console.log('The user is adult!');
} else {
    console.log('The user is not an adult!');
}

console.log('Checking, whether the function calling is working - ⤵️');
userProfile.changeName('Victor');
