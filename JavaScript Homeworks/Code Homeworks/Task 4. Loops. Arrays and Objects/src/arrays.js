const names = ['Anne', 'Victor', 'Oleksandr', 'Dmytro', 'Helene'];
const prices = [0.1, 12, 43, 10, 20, 7];
const mixedValues = [true, 'Rock', [4, 8, 15, 16, 23, 42], 'Lost', undefined, -17.4, null, 'Nothing'];

/* --------------- Manipulating over elements of 'names' array. --------------- */

console.log(`'names' array has ${names.length} elements.
First element is '${names[0]}' and the last one is '${names[names.length - 1]}'.`);

names.push('Taras');

console.log(`We added a new name to the list, and now the last value of the 'names' array is '${names[names.length - 1]}'.`);

names.shift();

console.log(`We removed the first element from the 'names' array, and now the first value is '${names[0]}'.`);

console.log('Iterating through the \'names\' array using \'for\' loop:');

for (let i = 0; i < names.length; i++) {
    console.log(`- ${names[i]}`);
}

/* --------------- Manipulating over elements of 'prices' array. --------------- */

console.log(`\nCurrent 'prices' array state: ${prices}.`);

console.log(`We multiplied all the elements in the 'prices' array using 'map' function: ${prices.map(element => element * 2)}.
But the original 'prices' array stays the same: ${prices}.`);

/* --------------- Manipulating over elements of 'mixedValues' array. --------------- */

console.log(`\nCurrent 'mixedValues' array state: ${mixedValues}.`);

mixedValues.forEach(element => {
    if (typeof element !== 'number' || typeof element !== 'string') {
        mixedValues.splice(mixedValues.indexOf(element), 1);
    }
});

console.log(`We removed all the elements that are bigger than 10 using 'forEach' function, and now 'mixedValues' array state is: ${mixedValues}.`);
