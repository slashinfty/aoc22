const fs = require('fs');
const path = require('path');

const example = false;

const realInput = fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8');

const exampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

let exampleSolution1 = 24000;

let exampleSolution2 = 45000;

const input = (example ? exampleInput : realInput).split('\n\n').map(x => x.split('\n')).map(x => x.map(y => parseInt(y)));

/* Task One */
let solution1 = input.reduce((max, curr) => Math.max(max, curr.reduce((sum, cur) => sum + cur, 0)), 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* Task Two */

let solution2 = input.reduce((top3, curr) => [Math.max(curr.reduce((sum, cur) => sum + cur, 0), top3[0]), top3[1], top3[2]].sort((a, b) => a - b), [0, 0, 0]).reduce((sum, curr) => sum + curr, 0);
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);