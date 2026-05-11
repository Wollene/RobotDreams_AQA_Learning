function addEntitiesInArray(array, type) {

    if (!Array.isArray(array)) return 'The value provided to the function is not an array.';
    if (type !== 'strings' && type !== 'numbers') return 'An incorrect type was provided. Allowed values: \'strings\', \'numbers\'.';

    let sum;

    if (type === 'numbers') {

        sum = 0;

        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] !== 'number') {
                return `Array contains invalid characters! Character: '${array[i]}'.`;
            }

            sum += array[i];
        }

        return sum;

    } else {

        sum = '';

        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] !== 'string') {
                return `Array contains invalid characters! Character: '${array[i]}'.`;
            }

            sum += array[i];
        }

        return sum;
    }
}

const numbersArray = [4, 8, 15, 16, 23, 42];
const stringsArray = ['Hello', 'Hey', 'Hola'];
const mixedArray = ['Hello', 1, 2, 3];
const notAnArray = 1;

console.log(`Numbers Array: => ${addEntitiesInArray(numbersArray, 'numbers')}
Strings Array: => ${addEntitiesInArray(stringsArray, 'strings')}
Mixed Array: => ${addEntitiesInArray(mixedArray, 'strings')}
Not an Array: => ${addEntitiesInArray(notAnArray, 'numbers')}`);
