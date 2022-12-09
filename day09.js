const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
This rope bridge creaks as you walk along it.
You aren't sure how old it is, or whether it can even support your weight.

It seems to support the Elves just fine, though.
The bridge spans a gorge which was carved out by the massive river far below you.

You step carefully; as you do, the ropes stretch and twist.
You decide to distract yourself by modeling rope physics; maybe you can even figure out where not to step.

Consider a rope with a knot at each end; these knots mark the head and the tail of the rope.
If the head moves far enough away from the tail, the tail is pulled toward the head.

Due to nebulous reasoning involving Planck lengths, you should be able to model the positions of the knots on a two-dimensional grid.
Then, by following a hypothetical series of motions (your puzzle input) for the head, you can determine how the tail will move.

Due to the aforementioned Planck lengths, the rope must be quite short; in fact, the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching).
*/

const exampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const exampleInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

/*
If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough.

Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up.

You just need to work out where the tail goes as the head follows a series of motions.
Assume the head and the tail both start at the same position, overlapping.
*/

let exampleSolution1 = 13;

let exampleSolution2 = 36;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

const input2 = (example ? exampleInput2 : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

/* TASK ONE */
/*
After simulating the rope, you can count up all of the positions the tail visited at least once.

Simulate your complete hypothetical series of motions.
How many positions does the tail of the rope visit at least once?
*/

let uniqueCoordinates = [ [0, 0] ];
let [hx, hy] = [0, 0];
let [tx, ty] = [0, 0];
input.forEach(line => {
    const [dir, steps] = line.split(' ');
    for (let i = 0; i < parseInt(steps); i++) {
        switch (dir) {
            case 'U':
                hy++;
                break;
            case 'D':
                hy--;
                break;
            case 'R':
                hx++;
                break;
            case 'L':
                hx--;
                break;
        }
        const [dx, dy] = [hx - tx, hy - ty];
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            tx += dx > 0 ? Math.ceil(dx / 2) : Math.floor(dx / 2);
            ty += dy > 0 ? Math.ceil(dy / 2) : Math.floor(dy / 2);
            if (uniqueCoordinates.findIndex(arr => arr[0] === tx && arr[1] === ty) === -1) {
                uniqueCoordinates.push([tx, ty]);
            }
        }
    }
});
let solution1 = uniqueCoordinates.length;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
A rope snaps! Suddenly, the river is getting a lot closer than you remember.
The bridge is still there, but some of the ropes that broke are now whipping toward you as you fall through the air!

The ropes are moving too quickly to grab; you only have a few seconds to choose how to arch your body to avoid being hit.
Fortunately, your simulation can be extended to support longer ropes.

Rather than two knots, you now must simulate a rope consisting of ten knots.
One knot is still the head of the rope and moves according to the series of motions.
Each knot further down the rope follows the knot in front of it using the same rules as before.

Now, you need to keep track of the positions the new tail visits.

Simulate your complete series of motions on a larger rope with ten knots.
How many positions does the tail of the rope visit at least once?
*/

uniqueCoordinates = [ [0, 0] ];
[hx, hy] = [0, 0];
const tails = [];
for (let i = 0; i < 9; i++) {
    tails.push(new Array(2).fill(0));
}
input2.forEach(line => {
    const [dir, steps] = line.split(' ');
    for (let i = 0; i < parseInt(steps); i++) {
        switch (dir) {
            case 'U':
                hy++;
                break;
            case 'D':
                hy--;
                break;
            case 'R':
                hx++;
                break;
            case 'L':
                hx--;
                break;
        }
        tails.forEach((tail, index) => {
            let [px, py] = index === 0 ? [hx, hy] : [tails[index - 1][0], tails[index - 1][1]];
            let [dx, dy] = [px - tail[0], py - tail[1]];
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                tail[0] += dx > 0 ? Math.ceil(dx / 2) : Math.floor(dx / 2);
                tail[1] += dy > 0 ? Math.ceil(dy / 2) : Math.floor(dy / 2);
                if (index === tails.length - 1 && uniqueCoordinates.findIndex(a => a[0] === tail[0] && a[1] === tail[1]) === -1) {
                    uniqueCoordinates.push([tail[0], tail[1]]);
                }
            }
        });
    }
});
let solution2 = uniqueCoordinates.length;
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);