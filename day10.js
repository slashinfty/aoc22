const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
You avoid the ropes, plunge into the river, and swim to shore.

The Elves yell something about meeting back up with them upriver, but the river is too loud to tell exactly what they're saying.
They finish crossing the bridge and disappear from view.

Situations like this must be why the Elves prioritized getting the communication system on your handheld device working.
You pull it out of your pack, but the amount of water slowly draining from a big crack in its screen tells you it probably won't be of much immediate use.

Unless, that is, you can design a replacement for the device's video system!
It seems to be some kind of cathode-ray tube screen and simple CPU that are both driven by a precise clock circuit.
The clock circuit ticks at a constant rate; each tick is called a cycle.

Start by figuring out the signal being sent by the CPU.
The CPU has a single register, X, which starts with the value 1.
It supports only two instructions:

    addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
    noop takes one cycle to complete. It has no other effect.

The CPU uses these instructions in a program (your puzzle input) to, somehow, tell the screen what to draw.

Consider the following small program:

noop
addx 3
addx -5

Execution of this program proceeds as follows:

    At the start of the first cycle, the noop instruction begins execution. During the first cycle, X is 1. After the first cycle, the noop instruction finishes execution, doing nothing.
    At the start of the second cycle, the addx 3 instruction begins execution. During the second cycle, X is still 1.
    During the third cycle, X is still 1. After the third cycle, the addx 3 instruction finishes execution, setting X to 4.
    At the start of the fourth cycle, the addx -5 instruction begins execution. During the fourth cycle, X is still 4.
    During the fifth cycle, X is still 4. After the fifth cycle, the addx -5 instruction finishes execution, setting X to -1.

*/

const exampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

/*
Maybe you can learn something by looking at the value of the X register throughout execution.
For now, consider the signal strength (the cycle number multiplied by the value of the X register) during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
*/

let exampleSolution1 = 13140;

let exampleSolution2 = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean);

/* TASK ONE */
/*
Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles.
What is the sum of these six signal strengths?
*/

let cycle = 0;
let register = 1;
let signalStrengths = [];
input.forEach(line => {
    cycle++;
    if (cycle % 40 === 20) {
        signalStrengths.push(register * cycle);
    }
    if (line !== 'noop') {
        const value = /(?<=\s)[-\d]+/.exec(line)[0];
        cycle++;
        if (cycle % 40 === 20) {
            signalStrengths.push(register * cycle);
        }
        register += parseInt(value);
    }
});
let solution1 = signalStrengths.reduce((sum, str) => sum + str, 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
It seems like the X register controls the horizontal position of a sprite.
Specifically, the sprite is 3 pixels wide, and the X register sets the horizontal position of the middle of that sprite.
(In this system, there is no such thing as "vertical position": if the sprite's horizontal position puts its pixels where the CRT is currently drawing, then those pixels will be drawn.)

You count the pixels on the CRT: 40 wide and 6 high.
This CRT screen draws the top row of pixels left-to-right, then the row below that, and so on.
The left-most pixel in each row is in position 0, and the right-most pixel in each row is in position 39.

Like the CPU, the CRT is tied closely to the clock circuit: the CRT draws a single pixel during each cycle.
Representing each pixel of the screen as a #, here are the cycles during which the first and last pixel in each row are drawn:

Cycle   1 -> ######################################## <- Cycle  40
Cycle  41 -> ######################################## <- Cycle  80
Cycle  81 -> ######################################## <- Cycle 120
Cycle 121 -> ######################################## <- Cycle 160
Cycle 161 -> ######################################## <- Cycle 200
Cycle 201 -> ######################################## <- Cycle 240

So, by carefully timing the CPU instructions and the CRT drawing operations, you should be able to determine whether the sprite is visible the instant each pixel is drawn.
If the sprite is positioned such that one of its three pixels is the pixel currently being drawn, the screen produces a lit pixel (#); otherwise, the screen leaves the pixel dark (.).

Render the image given by your program.
What eight capital letters appear on your CRT?
*/

cycle = 0;
register = [0, 1, 2];
let screen = ``;
input.forEach(line => {
    screen += register.some(r => r === cycle % 40) ? `#` : `.`;
    cycle++;
    if (cycle % 40 === 0) {
        screen += `\n`;
    }
    if (line !== 'noop') {
        const value = /(?<=\s)[-\d]+/.exec(line)[0];
        screen += register.some(r => r === cycle % 40) ? `#` : `.`;
        cycle++;
        if (cycle % 40 === 0) {
            screen += `\n`;
        }
        register.forEach((r, i) => register[i] = r + parseInt(value));
    }
});
let solution2 = screen;
console.log(example ? `Expected:\n${exampleSolution2}\nActual:\n${solution2}` : `Solution:\n${solution2}`);