const fs = require('fs');
const path = require('path');

const example = true;

/* SITUATION */
/*

*/

const exampleInput = ``;

/*

*/

let exampleSolution1;

let exampleSolution2;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

/* TASK ONE */
/*

*/

let solution1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*

*/

let solution2;
//console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);