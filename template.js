const fs = require('fs');
const path = require('path');

const example = true;

const realInput = fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8');

const exampleInput = ``.split('\n').filter(Boolean);

let exampleSolution1;

let exampleSolution2;

const input =  (example ? exampleInput : realInput).split('\n').filter(Boolean);

/* Task One */

let solution1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* Task Two */

let solution2;
//console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);