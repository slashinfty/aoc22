const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*

*/

const exampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

/*

*/

let exampleSolution1 = 7;

let exampleSolution2 = 19;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean)[0].split('');

/* TASK ONE */
/*

*/

let solution1 = input.findIndex((x, i, a) => i > 2 && [...new Set(a.slice(i - 3, i + 1))].length === 4) + 1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*

*/

let solution2 = input.findIndex((x, i, a) => i > 12 && [...new Set(a.slice(i - 13, i + 1))].length === 14) + 1;
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);