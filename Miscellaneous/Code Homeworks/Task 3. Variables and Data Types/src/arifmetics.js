const firstNumber = 5;
const secondNumber = 17.5;

const firstString = 'hello';
const secondString = '100';

const firstBoolean = true;
const secondBoolean = Boolean(0);

const nullValue = null;
const undefinedValue = undefined;

console.log(`\nMathematical Operations with Integers:
5 + 17.5: ${firstNumber + secondNumber},
5 - 17.5: ${firstNumber + secondNumber},
17.5 % 5: ${secondNumber % firstNumber},
5 ** 17.5: ${firstNumber ** secondNumber}.`);

console.log(`\nOperations with Strings:
5 + 'hello': ${firstNumber + firstString},
17.5 + '100': ${secondNumber + secondString},
'hello' - 5: ${firstString - firstNumber},
'100' - 17.5: ${secondString - secondNumber},
'hello' * 5: ${firstString * firstNumber}.`);

console.log(`\nOther Operations (e. g. Boolean, NaN and others):
5 + true: ${firstNumber + firstBoolean},
5 + null: ${firstNumber + nullValue},
5 + undefined: ${firstNumber + undefinedValue},
'hello' - false: ${firstString - secondBoolean},
'hello' - null: ${firstString - nullValue},
'hello' - undefined: ${firstString - undefinedValue}.`);
