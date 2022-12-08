const fs = require('fs');
const path = require('path');

const example = true;

/* SITUATION */
/*
The expedition comes across a peculiar patch of tall trees all planted carefully in a grid.
The Elves explain that a previous expedition planted these trees as a reforestation effort.
Now, they're curious if this would be a good location for a tree house.

First, determine whether there is enough tree cover here to keep a tree house hidden.
To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input).
*/

const exampleInput = `30373
25512
65332
33549
35390`;

/*
Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view.
In this example, that only leaves the interior nine trees to consider:

    The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
    The top-middle 5 is visible from the top and right.
    The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
    The left-middle 5 is visible, but only from the right.
    The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
    The right-middle 3 is visible from the right.
    In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.
*/

let exampleSolution1 = 21;

let exampleSolution2 = 8;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean).map(x => x.split('').map(y => parseInt(y)));

/* TASK ONE */
/*
Consider your map; how many trees are visible from outside the grid?
*/

const transposition = input.map((row, index, array) => {
    const column = [];
    array.forEach(r => column.push(r[index]));
    return column;
});
let solution1 = input.reduce((sum, row, index) => {
    if (index === 0 || index === input.length - 1) {
        return sum + row.length;
    }
    let rowSum = 0;
    for (i = 0; i < row.length; i++) {
        if (i === 0 || i === row.length - 1) {
            rowSum++;
        } else {
            const x = row[i];
            if (
                row.slice(0, i).every(v => v < x) ||
                row.slice(i + 1).every(v => v < x) ||
                transposition[i].slice(0, index).every(v => v < x) ||
                transposition[i].slice(index + 1).every(v => v < x)
            ) {
                rowSum++;
            }
        }
    }
    return sum + rowSum;
}, 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration.
(If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

A tree's scenic score is found by multiplying together its viewing distance in each of the four directions.

Consider each tree on your map.
What is the highest scenic score possible for any tree?
*/

const viewingDistance = (value, array) => {
    let i = 0;
    do {
        i++;
        if (i === array.length || value <= array[i - 1]) break;
    } while (true);
    return i;
}
const scenicScores = [];
for (let i = 1; i < input.length - 1; i++) {
    const row = input[i];
    for (let j = 1; j < row.length - 1; j++) {
        const value = row[j];
        const viewingDistances = [
            viewingDistance(value, row.slice(0, j).reverse()),
            viewingDistance(value, row.slice(j + 1)),
            viewingDistance(value, transposition[j].slice(0, i).reverse()),
            viewingDistance(value, transposition[j].slice(i + 1))
        ];
        scenicScores.push(viewingDistances.reduce((prod, curr) => prod *= curr, 1));
    }
}
let solution2 = Math.max(...scenicScores);
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);