export const numbersArray = [4, 8, 15, 16, 23, 42];
export const stringsArray = ['Hello', 'Hey', 'Hola'];
export const mixedArray = ['Hello', 1, 2, 3];
export const notAnArray = 1;
const emptyNumberArray: number[] = [];
const emptyStringArray: string[] = [];

function addEntitiesInArray(array: string[] | number[]): string | number {
    if (array.length === 0) throw new Error('Array is empty!');
    let sum = typeof array[0] === 'number' ? 0 : '';
    for (const item of array) {
        sum += item;
    }
    return sum;
}

console.log(`Numbers Array: => ${addEntitiesInArray(numbersArray)}
Strings Array: => ${addEntitiesInArray(stringsArray)}
Mixed Array: => addEntitiesInArray(mixedArray) (${mixedArray}) won't compile
Not an Array: => addEntitiesInArray(notAnArray) (${notAnArray}) won't compile
Empty Number Array: => addEntitiesInArray(emptyNumberArray) (${emptyNumberArray}) will throw an error
Empty String Array: => addEntitiesInArray(emptyStringArray) (${emptyStringArray}) will throw an error`);
