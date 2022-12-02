const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
Rock Paper Scissors is a game between two players.
Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape.
Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.
If both players choose the same shape, the round instead ends in a draw.

Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win.
"The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors.
The second column--" Suddenly, the Elf is called away to help with someone's tent.

The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors.
Winning every time would be suspicious, so the responses must have been carefully chosen.

The winner of the whole tournament is the player with the highest score.
Your total score is the sum of your scores for each round.
The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.
*/

const exampleInput = 
`A Y
B X
C Z`;

/*
This strategy guide predicts and recommends the following:

    In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
    In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
    The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.

*/

let exampleSolution1 = 15;

let exampleSolution2 = 12;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean).map(x => x.split(' '));

/* TASK ONE */
/*
What would your total score be if everything goes exactly according to your strategy guide?
*/

const player = [undefined, 'X', 'Y', 'Z'];
const opponent = ['C', 'A', 'B'];
let solution1 = input.reduce((sum, curr) => {
    const o = opponent.indexOf(curr[0]);
    const p = player.indexOf(curr[1]);
    return sum + p + (p - o === 1 ? 6 : p - o === 0 || p - o === 3 ? 3 : 0);
}, 0);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*
The Elf finishes helping with the tent and sneaks back over to you.
"Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated.
*/

const outcome = {
    "X": {
        "A": "Z",
        "B": "X",
        "C": "Y"
    },
    "Y": {
        "A": "X",
        "B": "Y",
        "C": "Z"
    },
    "Z": {
        "A": "Y",
        "B": "Z",
        "C": "X"
    }
}
let solution2 = input.reduce((sum, curr) => {
    const o = opponent.indexOf(curr[0]);
    const p = player.indexOf(outcome[curr[1]][curr[0]]);
    return sum + p + (p - o === 1 ? 6 : p - o === 0 || p - o === 3 ? 3 : 0);
}, 0);
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);