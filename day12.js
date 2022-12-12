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

let exampleSolution1 = 31;

let exampleSolution2;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

/* TASK ONE */
/*

*/

const rowLength = input[0].length;
const grid = input.join('').split('').map(x => 'SabcdefghijklmnopqrstuvwxyzE'.indexOf(x));
const start = grid.indexOf(0);
const end = grid.indexOf(27);
let paths = [ [start] ];
let complete = [];
do {
    let pathsToEvaluate = paths;
    paths = [];
    for (let index = 0; index < pathsToEvaluate.length; index++) {
        let path = pathsToEvaluate[index];
        if (path === undefined) continue;
        let lastNode = path[path.length - 1];
        let lastValue = grid[lastNode];
        let newNodes = [];
        if (lastNode % rowLength > 0 && grid[lastNode - 1] - grid[lastNode] < 2 && path.every(n => n !== lastNode - 1)) {
            newNodes.push(lastNode - 1);
        }
        if (lastNode % rowLength < rowLength - 1 && grid[lastNode + 1] - grid[lastNode] < 2 && path.every(n => n !== lastNode + 1)) {
            newNodes.push(lastNode + 1);
        }
        if (lastNode > rowLength - 1 && grid[lastNode - rowLength] - grid[lastNode] < 2 && path.every(n => n !== lastNode - rowLength)) {
            newNodes.push(lastNode - rowLength);
        }
        if (lastNode < grid.length - rowLength && grid[lastNode + rowLength] - grid[lastNode] < 2 && path.every(n => n !== lastNode + rowLength)) {
            newNodes.push(lastNode + rowLength);
        }
        newNodes.forEach(node => {
            let newPath = [...path, node];
            let bestPath = true;
            if (paths.some(p => p.indexOf(node) > -1)) {
                let oldPath = paths.find(p => p.indexOf(node) > -1);
                if (oldPath.length <= newPath.length) {
                    bestPath = false;
                } else {
                    paths[paths.findIndex(p => p.indexOf(node) > -1)] = undefined;
                }
            }
            if (pathsToEvaluate.some(p => p.indexOf(node) > -1)) {
                let oldPath = pathsToEvaluate.find(p => p.indexOf(node) > -1);
                if (oldPath.length <= newPath.length) {
                    bestPath = false;
                } else {
                    pathsToEvaluate[pathsToEvaluate.findIndex(p => p.indexOf(node) > -1)] = undefined;
                }
            }
            if (bestPath === true) {
                if (node === end) {
                    complete.push(newPath);
                } else {
                    paths.push(newPath);
                }
            }
        });
    }
    paths = paths.filter(Boolean);
} while(paths.length > 0);

let solution1 = complete.reduce((min, path) => Math.min(min, path.length), complete[0].length) - 1;
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*

*/

let solution2;
//console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);