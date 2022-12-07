const fs = require('fs');
const path = require('path');

const example = true;

/* SITUATION */
/*
You can hear birds chirping and raindrops hitting leaves as the expedition proceeds.
Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?

The device the Elves gave you has problems with more than just its communication system.
You try to run a system update:

$ system-update --please --pretty-please-with-sugar-on-top
Error: No space left on device

Perhaps you can delete some files to make space for the update?

You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input).
*/

const exampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

/*
The filesystem consists of a tree of files (plain data) and directories (which can contain other directories or files).
The outermost directory is called /.
You can navigate around the filesystem, moving into or out of directories and listing the contents of the directory you're currently in.

Within the terminal output, lines that begin with $ are commands you executed, very much like some modern computers:

    cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
        cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
        cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
        cd / switches the current directory to the outermost directory, /.
    ls means list. It prints out all of the files and directories immediately contained by the current directory:
        123 abc means that the current directory contains a file named abc with size 123.
        dir xyz means that the current directory contains a directory named xyz.
*/

let exampleSolution1 = 95437;

let exampleSolution2 = 24933642;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

/* TASK ONE */
/*
Since the disk is full, your first step should probably be to find directories that are good candidates for deletion.
To do this, you need to determine the total size of each directory.
The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly.
(Directories themselves do not count as having any intrinsic size.)

To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes.
In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584).
(As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000.
What is the sum of the total sizes of those directories?
*/

input.shift();
let paths = [];
let directory = {};
input.forEach(line => {
    if (line.startsWith('$') === true && line !== '$ ls') {
        const dir = line.match(/(?<=\$\scd\s)[\w\.]+/)[0];
        if (dir === '..') {
            paths.pop();
        } else {
            let currDir = directory;
            paths.forEach(path => currDir = currDir[path]);
            currDir[dir] = {};
            paths.push(dir);
        }
    } else if (line.startsWith('$') === false && line.startsWith('dir') === false) {
        const [size, file] = line.split(' ');
        let currDir = directory;
        paths.forEach(path => currDir = currDir[path]);
        currDir[file] = parseInt(size);
    }
});
const dirSizes = [];
const getSize = dir => {
    let size = 0;
    const elements = Object.keys(dir);
    elements.forEach(element => typeof dir[element] === 'number' ? size += dir[element] : size += getSize(dir[element]));
    dirSizes.push(size);
    return size;
}
const totalUsed = getSize(directory);
let solution1 = dirSizes.filter(s => s <= 100000).reduce((sum, curr) => sum + curr, 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
Now, you're ready to choose a directory to delete.

The total disk space available to the filesystem is 70000000.
To run the update, you need unused space of at least 30000000.
You need to find a directory you can delete that will free up enough space to run the update.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update.
What is the total size of that directory?
*/

const totalFree = 70000000 - totalUsed;
let solution2 = Math.min(...dirSizes.filter(size => size >= 30000000 - totalFree));
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);