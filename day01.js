const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot.
As your boats approach land, the Elves begin taking inventory of their supplies.
One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line.
Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.
*/

const exampleInput = 
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

/*
This list represents the Calories of the food carried by five Elves:

    The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
    The second Elf is carrying one food item with 4000 Calories.
    The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
    The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
    The fifth Elf is carrying one food item with 10000 Calories.
*/

let exampleSolution1 = 24000;
let exampleSolution2 = 45000;
const input = (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n\n').map(x => x.split('\n')).map(x => x.map(y => parseInt(y)));

/* TASK ONE */
/*
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories.

Find the Elf carrying the most Calories.
How many total Calories is that Elf carrying?
*/

let solution1 = input.reduce((max, curr) => Math.max(max, curr.reduce((sum, cur) => sum + cur, 0)), 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories.
That way, even if one of those Elves runs out of snacks, they still have two backups.

Find the top three Elves carrying the most Calories.
How many Calories are those Elves carrying in total?
*/

let solution2 = input.reduce((top3, curr) => [Math.max(curr.reduce((sum, cur) => sum + cur, 0), top3[0]), top3[1], top3[2]].sort((a, b) => a - b), [0, 0, 0]).reduce((sum, curr) => sum + curr, 0);
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);