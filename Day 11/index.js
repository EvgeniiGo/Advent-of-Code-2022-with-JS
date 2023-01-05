const fs = require('fs');
let input;

// Reading input data from file
fs.readFile('./input.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  input = data;
  // console.log(input);

  // split data by line
  input = input.split('\r\n\r\n');
  // console.log(input);

  const monkeys = {};
  // creating of monkeys object from input
  input.forEach((monkey) => {
    let [monkeyNum, items, operation, test, ifTrue, ifFalse] = monkey.split('\r\n');
    monkeyNum = monkeyNum.split(' ')[1];
    monkeyNum = monkeyNum.slice(0, monkeyNum.length - 1);
    items = items.split(': ')[1].split(', ');
    operation = operation.split('= ')[1];
    test = Number(test.split('by ')[1]);
    ifTrue = ifTrue.split('monkey ')[1];
    ifFalse = ifFalse.split('monkey ')[1];

    monkeys[monkeyNum] = {
      'items': items,
      'operation': operation,
      'test': test,
      'ifTrue': ifTrue,
      'ifFalse': ifFalse,
      'inspections': 0,   // how many times items were inspected by monkey
    }
  })

  // count multiplicator of all division tests to reduce worryLevel
  let multiplicator = 1;
  Object.keys(monkeys).forEach((monkey) => {
    multiplicator *= monkeys[monkey]['test'];
  }
  );

  // function for turn
  function turn(monkeyNum) {
    // add inspection to the monkey
    monkeys[monkeyNum]['inspections'] += 1;

    // get initial worry level of first item
    let worryLevel = Number(monkeys[monkeyNum]['items'][0]);

    // count new worry level
    if (monkeys[monkeyNum]['operation'][4] === '*') {
      const value = monkeys[monkeyNum]['operation'].split('* ')[1];
      if (value === 'old') {
        worryLevel *= worryLevel;
      } else {
        worryLevel *= Number(value);
      }
      worryLevel = worryLevel % multiplicator;
    } else if (monkeys[monkeyNum]['operation'][4] === '+') {
      const value = monkeys[monkeyNum]['operation'].split('+ ')[1];
      if (value === 'old') {
        worryLevel += worryLevel;
      } else {
        worryLevel += Number(value);
      }
    } else {
      console.log('operation not recognised');
    }

    // delete an item from the current list of items 
    monkeys[monkeyNum]['items'].shift()

    // check if test is true or false and throw an item to another monkey
    if (worryLevel % monkeys[monkeyNum]['test'] === 0) {
      monkeys[monkeys[monkeyNum]['ifTrue']]['items'].push(worryLevel);
    } else {
      monkeys[monkeys[monkeyNum]['ifFalse']]['items'].push(worryLevel);
    }
  }

  // function for round
  function doRound() {
    Object.keys(monkeys).forEach((monkey) => {
      // if monkey has items - make a turn
      while (monkeys[monkey]['items'].length > 0) {
        turn(monkey);
      }
    })
  }

  // do 20 rounds
  for (let i = 0; i < 10000; i++) {
    doRound();
  }

  const inspections = [];
  Object.keys(monkeys).forEach((monkey) => {
    inspections.push(monkeys[monkey]['inspections']);
  });
  inspections.sort((a, b) => b - a);

  console.log(inspections[0] * inspections[1]);
});