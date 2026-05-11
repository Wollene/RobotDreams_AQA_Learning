/* --------------- Iterating from 0 to 9 and from 100 to 0 using 'for' loop. --------------- */

for (let i = 0; i <= 9; i++) {
    console.log(`[ITERATING THROUGH 'FOR' (0 to 9)] i = ${i}`);
}

for (let i = 100; i >= 0; i -= 10) {
    console.log(`[ITERATING THROUGH 'FOR' (100 to 0)] i = ${i}`);
}

/* --------------- Iterating from 0 to 9 and from 100 to 0 using 'while' loop. --------------- */

let i = 0;

while (i <= 9) {
    console.log(`[ITERATING THROUGH 'WHILE' (0 to 9)] i = ${i}`);
    i++;
}

i = 100;

while (i >= 0) {
    console.log(`[ITERATING THROUGH 'WHILE' (100 to 0)] i = ${i}`);
    i -= 10;
}

/* --------------- Iterating from 0 to 9 and from 100 to 0 using 'do...while' loop. --------------- */

i = 0;

do {
    console.log(`[ITERATING THROUGH 'DO...WHILE' (0 to 9)] i = ${i}`);
    i++;
} while (i <= 9);

i = 100;

do {
    console.log(`[ITERATING THROUGH 'DO...WHILE' (100 to 0)] i = ${i}`);
    i -= 10;
} while (i >= 0);
