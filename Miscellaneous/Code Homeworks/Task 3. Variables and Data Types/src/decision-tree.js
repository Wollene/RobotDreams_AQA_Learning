const userAge = 18;
const userName = 'Oleksandr';
const userRole = 'Admin';
const subscriptionPrice = 120.0;
let isLoggedIn = false;
let isBlocked = false;
let hasSubscription = false;
let balance = 120.0;

if (userAge < 18 || userAge >= 80) {
    console.log('Sorry, but you\'re not allowed to register here!');
    isBlocked = true;
}

if (!isBlocked && !isLoggedIn) {
    console.log(`Hello, ${userName}! You're successfully logged in!`);
    isLoggedIn = true;
};

if (balance < subscriptionPrice && hasSubscription === false) {
    console.log('Sorry, you don\'t have enough funds to buy the subscription!');
} else if (balance >= subscriptionPrice && hasSubscription === true) {
    console.log('You already have a subscription!');
} else if (balance >= subscriptionPrice) {
    console.log('You\'ve successfully bought a subscription!');
    balance -= subscriptionPrice;
    hasSubscription = true;
}

if (isLoggedIn && userRole === 'Admin') {
    console.log(`Hello, ${userName}! You're an Admin!`);
} else if (isLoggedIn && hasSubscription && userRole === 'Premium') {
    console.log(`Hello, ${userName}! You're a Premium user!`);
} else {
    console.log(`Hello, ${userName}! You're running on a Free plan!`);
}

console.log(`\nUser Name: ${userName},
User Role: ${userRole},
Blocked: ${isBlocked},
Subscription Status: ${hasSubscription},
Current Balance: ${balance}.`);
