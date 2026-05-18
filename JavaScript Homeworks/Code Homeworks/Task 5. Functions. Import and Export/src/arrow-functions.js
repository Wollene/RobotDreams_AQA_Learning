/* There is no such an advanced type checks as in an initial 'non-arrow' addEntitiesInArray() function,
so there will be only functional core, adding up entities in the array. Might be errors if incorrect
values were provided. */

const addEntitiesInArray = (array) => array.reduce((result, currentValue) => result + currentValue);

const numbersArray = [4, 8, 15, 16, 23, 42];
const stringsArray = ['Hello', 'Hey', 'Hola'];
const mixedArray = ['Hello', 1, 2, 3];

console.log(`Numbers Array: => ${addEntitiesInArray(numbersArray)}
Strings Array: => ${addEntitiesInArray(stringsArray)}
Mixed Array: => ${addEntitiesInArray(mixedArray)}`);
