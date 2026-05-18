export const numbersArray = [4, 8, 15, 16, 23, 42];
export const stringsArray = ['Hello', 'Hey', 'Hola'];
export const mixedArray = ['Hello', 1, 2, 3];
export const notAnArray = 1;

function addEntitiesInArray(array: string[] | number[]): string | number {
    let sum;
    if (array.length > 1 && typeof array[0] === 'number') {
        sum = 0;
        for (const item of array) {
            sum = sum + item;
        }
        return sum;
    } else {
        sum = '';
        for (const item of array) {
            sum = sum + item;
        }
        return sum;
    }
}

console.log(`Numbers Array: => ${addEntitiesInArray(numbersArray)}
Strings Array: => ${addEntitiesInArray(stringsArray)}
Mixed Array: => addEntitiesInArray(mixedArray) (${mixedArray}) won't compile
Not an Array: => addEntitiesInArray(notAnArray) (${notAnArray}) won't compile`);
