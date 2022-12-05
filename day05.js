const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
The expedition can depart as soon as the final supplies have been unloaded from the ships.
Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks.
To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps.
After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input).
*/

const exampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

/*
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3

Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3
*/

let exampleSolution1 = 'CMZ';

let exampleSolution2;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n');

/* TASK ONE */
/*
After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

const firstMove = input.findIndex(i => i.startsWith('move'));
const crateRows = input.slice(0, firstMove - 2);
const crates = [];
for (let i = 1; i < crateRows[0].length; i +=4) {
    const crate = [];
    crateRows.forEach(row => {
        if (row.charAt(i) !== ' ') {
            crate.push(row.charAt(i));
        }
    })
    crates.push(crate);
}
const cratesCopy = [...crates];
const moves = input.slice(firstMove).map(x => x.match(/\d+/g).map(y => parseInt(y)));
moves.forEach(move => {
    crates[move[2] - 1] = [...crates[move[1] - 1].slice(0, move[0]).reverse(), ...crates[move[2] - 1]];
    crates[move[1] - 1].splice(0, move[0]);
});
let solution1 = crates.reduce((str, crate) => str + crate[0], '');
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away.
The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies.
After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

moves.forEach(move => {
    cratesCopy[move[2] - 1] = [...cratesCopy[move[1] - 1].slice(0, move[0]).reverse(), ...cratesCopy[move[2] - 1]];
    cratesCopy[move[1] - 1].splice(0, move[0]);
});
let solution2 = cratesCopy.reduce((str, crate) => str + crate[0], '');
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);