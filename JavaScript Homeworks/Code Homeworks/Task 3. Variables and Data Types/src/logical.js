const firstNumber = 5;
const secondNumber = 17.5;

const firstString = 'hello';
const secondString = '100';

const firstBoolean = true;
const secondBoolean = Boolean(0);

const nullValue = null;
const undefinedValue = undefined;
const nanValue = NaN;

console.log(`\n>, <, >=, <= Comparisons:
5 > 17.5: ${firstNumber > secondNumber},
5 > '100': ${firstNumber > secondString},
100 >= '100': ${100 >= secondString},
'hello' <= '100': ${firstString <= secondString},
5 < true: ${firstNumber < firstBoolean},
0 >= false: ${0 >= secondBoolean}.`);

console.log(`\n==, ===, !=, !== Comparisons:
100 == '100': ${100 == secondString},
100 === '100': ${100 === secondString},
0 == false: ${0 == secondBoolean},
0 === false: ${0 === secondBoolean},
'hello' != '100': ${firstString != secondString},
NaN !== undefined: ${nanValue !== undefinedValue},
null !== false: ${nullValue !== secondBoolean}.`);

console.log(`\n&&, ||, ! Operators:
5 && 17.5: ${Boolean(firstNumber && secondNumber)},
5 || 0: ${Boolean(firstNumber || 0)},
!5: ${Boolean(!5)},
!false: ${!secondBoolean}.`);


