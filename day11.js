const fs = require('fs');
const path = require('path');

const example = false;

/* SITUATION */
/*
As you finally start making your way upriver, you realize your pack is much lighter than you remember.
Just then, one of the items from your pack goes flying overhead.
Monkeys are playing Keep Away with your missing things!

To get your stuff back, you need to be able to predict where the monkeys will throw your items.
After some careful observation, you realize the monkeys operate based on how worried you are about each item.

You take some notes (your puzzle input) on the items each monkey currently has, how worried you are about those items, and how the monkey makes decisions based on your worry level.

Each monkey has several attributes:

    Starting items lists your worry level for each item the monkey is currently holding in the order they will be inspected.
    Operation shows how your worry level changes as that monkey inspects an item. (An operation like new = old * 5 means that your worry level after the monkey inspected the item is five times whatever your worry level was before inspection.)
    Test shows how the monkey uses your worry level to decide where to throw an item next.
        If true shows what happens with an item if the Test was true.
        If false shows what happens with an item if the Test was false.

After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.

The monkeys take turns inspecting and throwing items.
On a single monkey's turn, it inspects and throws all of the items it is holding one at a time and in the order listed.
Monkey 0 goes first, then monkey 1, and so on until each monkey has had one turn.
The process of each monkey taking a single turn is called a round.

When a monkey throws an item to another monkey, the item goes on the end of the recipient monkey's list.
A monkey that starts a round with no items could end up inspecting and throwing many items by the time its turn comes around.
If a monkey is holding no items at the start of its turn, its turn ends.
*/

const exampleInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

/*
Chasing all of the monkeys at once is impossible; you're going to have to focus on the two most active monkeys if you want any hope of getting your stuff back.
Count the total number of times each monkey inspects items over 20 rounds.

The level of monkey business in this situation can be found by multiplying these together.
*/

let exampleSolution1 = 10605;

let exampleSolution2 = 2713310158;

const input =  (example ? exampleInput : fs.readFileSync(path.resolve(__dirname, `./inputs/${path.basename(__filename).replace('.js', '')}`), 'utf-8'))
.split('\n').filter(Boolean).map(x => x.trim());

/* TASK ONE */
/*
Figure out which monkeys to chase by counting how many items they inspect over 20 rounds.
What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
*/

class Monkey {
    constructor(arr) {
        this.number = parseInt(/\d+/.exec(arr[0])[0]);
        this.items = arr[1].match(/\d+/g).map(i => parseInt(i));
        this.operation = {
            type: /[\+\*]/.exec(arr[2])[0],
            value: /(?<=[\+\*]\s)(\d+|old)/.exec(arr[2])[0]
        },
        this.testValue = parseInt(/\d+/.exec(arr[3])[0]);
        this.throwTo = {
            true: parseInt(/\d+/.exec(arr[4])[0]),
            false: parseInt(/\d+/.exec(arr[5])[0])
        }
        this.inspections = 0;
    }

    inspect(item, reducer = 0) {
        let val = item;
        this.inspections++;
        if (this.operation.type === '+') {
            val += parseInt(this.operation.value);
        } else if (this.operation.value === 'old') {
            val = val ** 2;
        } else {
            val *= parseInt(this.operation.value);
        }
        if (reducer === 0) {
            val = Math.floor(val / 3);
        } else {
            val = val - (reducer * Math.floor(val / reducer));
        }
        if (val % this.testValue === 0) {
            return [val, this.throwTo.true];
        } else {
            return [val, this.throwTo.false];
        }
    }
}

let monkeys = [];
for (let i = 0; i < input.length; i += 6) {
    const monkey = new Monkey(input.slice(i, i + 6));
    monkeys.push(monkey);
}
for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
            const [value, throwTo] = monkey.inspect(item);
            monkeys.find(m => m.number === throwTo).items.push(value);
        });
        monkey.items = [];
    });
}
let solution1 = monkeys.sort((a, b) => b.inspections - a.inspections).reduce((prod, monkey, index) => index > 1 ? prod : prod * monkey.inspections, 1);
console.log(example ? `Expected: ${exampleSolution1}\nActual: ${solution1}` : `Solution: ${solution1}`);

/* TASK TWO */
/*

*/

monkeys = [];
for (let i = 0; i < input.length; i += 6) {
    const monkey = new Monkey(input.slice(i, i + 6));
    monkeys.push(monkey);
}
const reduce = monkeys.reduce((prod, monkey) => prod * monkey.testValue, 1);
for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
            const [value, throwTo] = monkey.inspect(item, reduce);
            monkeys.find(m => m.number === throwTo).items.push(value);
        });
        monkey.items = [];
    });
}
let solution2 = monkeys.sort((a, b) => b.inspections - a.inspections).reduce((prod, monkey, index) => index > 1 ? prod : prod * monkey.inspections, 1);
console.log(example ? `Expected: ${exampleSolution2}\nActual: ${solution2}` : `Solution: ${solution2}`);