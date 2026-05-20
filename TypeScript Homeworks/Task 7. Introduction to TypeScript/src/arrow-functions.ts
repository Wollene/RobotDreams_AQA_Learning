import { numbersArray, stringsArray, mixedArray, notAnArray } from './functions';

const addEntitiesInArrayArrow = (array: string[] | number[]): string | number => {
    let sum = typeof array[0] === 'number' ? 0 : '';
    array.forEach((item) => (sum += item));
    return sum;
};

console.log(`Numbers Array: => ${addEntitiesInArrayArrow(numbersArray)}
Strings Array: => ${addEntitiesInArrayArrow(stringsArray)}
Mixed Array: => addEntitiesInArrayArrow(mixedArray) (${mixedArray}) won't compile
Not an Array: => addEntitiesInArrayArrow(notAnArray) (${notAnArray}) won't compile`);
