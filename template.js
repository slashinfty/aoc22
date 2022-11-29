const fs = require('fs');
const path = require('path');

const example = true;

const exampleInput = ``.split('\n').filter(Boolean);

const exampleSolution1;

const exampleSolution2;

const input =  example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

/* Task One */

const solution1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* Task Two */
/*
const solution2;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution2}` : `Solution: ${solution2}`);
*/