const fs = require('fs');
const path = require('path');

const example = true;

/* SITUATION */
/*

*/

const exampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

/*

*/

let exampleSolution1;

let exampleSolution2;

const alphaNum = 'SabcdefghijklmnopqrstuvwxyzE';
const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean).map(x => x.split('').map(y => alphaNum.indexOf(y)));

/* TASK ONE */
/*

*/

// Start and end
const start = [input.findIndex(row => row.some(col => col === 0)), input[input.findIndex(row => row.some(col => col === 0))].findIndex(col => col === 0)];
const end = [input.findIndex(row => row.some(col => col === 27)), input[input.findIndex(row => row.some(col => col === 27))].findIndex(col => col === 27)];
// Current paths, and complete paths
let paths = [ [start] ];
let completePaths = [];
// Evaluation
do {
    // Move paths
    let pathsToEvaluate = paths;
    paths = [];
    // Evaluate each path
    for (let index = 0; index < pathsToEvaluate.length; index++) {
        // Current path
        let path = pathsToEvaluate[index];
        // Skip if path no longer exists
        if (path === undefined) {
            continue;
        }
        // To continue paths
        let newNodes = [];
        // Where the path current ends and its value
        let [lastRow, lastCol] = path[path.length - 1];
        let lastVal = input[lastRow][lastCol];
        // Get new nodes - skip if off grid, if its the previous node, or if it's too tall
        // Node above
        if (input[lastRow - 1] !== undefined && JSON.stringify([lastRow - 1, lastCol]) !== JSON.stringify(path[path.length - 2]) && input[lastRow - 1][lastCol] - lastVal < 2) {
            newNodes.push([lastRow - 1, lastCol]);
        }
        // Node below
        if (input[lastRow + 1] !== undefined && JSON.stringify([lastRow + 1, lastCol]) !== JSON.stringify(path[path.length - 2]) && input[lastRow + 1][lastCol] - lastVal < 2) {
            newNodes.push([lastRow + 1, lastCol]);
        }
        // Node left
        if (input[lastRow][lastCol - 1] !== undefined && JSON.stringify([lastRow, lastCol - 1]) !== JSON.stringify(path[path.length - 2]) && input[lastRow][lastCol - 1] - lastVal < 2) {
            newNodes.push([lastRow, lastCol - 1]);
        }
        // Node right
        if (input[lastRow][lastCol + 1] !== undefined && JSON.stringify([lastRow, lastCol + 1]) !== JSON.stringify(path[path.length - 2]) && input[lastRow][lastCol + 1] - lastVal < 2) {
            newNodes.push([lastRow, lastCol + 1]);
        }
        // Add paths that are better than the rest that intersect at the node
        newNodes.forEach(node => {
            let bestPath = true;
            let newPath = [...path, node];
            // Check paths that have been evaluated
            let intersectionIndex = paths.findIndex(p => p.some(n => JSON.stringify(n) === JSON.stringify(node)));
            if (intersectionIndex > -1) {
                // Get the path up to the intersection point
                let intersection = paths[intersectionIndex];
                let slice = intersection.slice(0, intersection.findIndex(i => JSON.stringify(i) === JSON.stringify(node)) + 1);
                // Determine which path is best
                if (slice.length <= newPath.length) {
                    bestPath = false;
                } else {
                    paths[intersectionIndex] = undefined;
                }
            }
            // Check paths that have not been evaluated yet
            intersectionIndex = pathsToEvaluate.findIndex(p => p.some(n => JSON.stringify(n) === JSON.stringify(node)));
            if (intersectionIndex > -1) {
                // Get the path up to the intersection point
                let intersection = pathsToEvaluate[intersectionIndex];
                let slice = intersection.slice(0, intersection.findIndex(i => JSON.stringify(i) === JSON.stringify(node)) + 1);
                // Determine which path is best
                if (slice.length <= newPath.length) {
                    bestPath = false;
                } else {
                    pathsToEvaluate[intersectionIndex] = undefined;
                }
            }
            // If it's the best path, add to paths (or complete paths)
            if (bestPath === true) {
                if (JSON.stringify(node) === JSON.stringify(end)) {
                    completePaths.push(newPath);
                } else {
                    paths.push(newPath);
                }
            }
        });
    };
    // Clear paths that no longer exist
    paths = paths.filter(Boolean);
} while (paths.length > 0);
// Determine the length of the shortest
let solution1 = completePaths.reduce((min, path) => Math.min(min, path.length), completePaths[0].length) - 1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*

*/

let solution2;
//console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);