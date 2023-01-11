const fs = require('fs');
let input;

class Int {
  constructor(value) {
    this.value = value;
  }
}

// Reading input data from file
fs.readFile('./input.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  input = data;
  // console.log(input);

  // split data by line
  input = input.split('\r\n');
  // console.log(input);

  const monkeys = {};
  const monkeysYelled = {};

  // dividing monkeys to 2 groups
  input.forEach((job) => {
    const line = job.split(' ');
    const name = line[0].slice(0, line[0].indexOf(':'))
    if (name !== 'humn') {
      // if this monkey only yells a number
      if (line.length === 2) {
        monkeysYelled[name] = Number(line[1]);
      } else {
        monkeys[name] = {
          'first': line[1],
          'second': line[3],
          'action': line[2]
        };
      };
    }
  });
  monkeys['root']['action'] = '=';
  for (let i = 0; i < 50; i++) {
    Object.keys(monkeys).forEach((monkey) => {
      const first = monkeys[monkey]['first'];
      const second = monkeys[monkey]['second'];
      if (
        Object.keys(monkeysYelled).includes(first)
        && Object.keys(monkeysYelled).includes(second)
      ) {
        switch (monkeys[monkey]['action']) {
          case '+':
            monkeysYelled[monkey] = monkeysYelled[first] + monkeysYelled[second];
            break;
          case '-':
            monkeysYelled[monkey] = monkeysYelled[first] - monkeysYelled[second];
            break;
          case '*':
            monkeysYelled[monkey] = monkeysYelled[first] * monkeysYelled[second];
            break;
          case '/':
            monkeysYelled[monkey] = monkeysYelled[first] / monkeysYelled[second];
            break;
        }
        delete monkeys[monkey];
      }
    });
  };

  for (let i = 0; i < 50; i++) {
    Object.keys(monkeys).forEach((monkey) => {
      const first = monkeys[monkey]['first'];
      const second = monkeys[monkey]['second'];
      if (Object.keys(monkeysYelled).includes(first)) {
        monkeys[monkey]['first'] = monkeysYelled[first];
      }
      else if (Object.keys(monkeysYelled).includes(second)) {
        monkeys[monkey]['second'] = monkeysYelled[second];
      }
    });
  };

  let currentMonkey;
  Object.keys(monkeys).forEach((monkey) => {
    const first = monkeys[monkey]['first'];
    const second = monkeys[monkey]['second'];
    if (first === 'humn' || second === 'humn') {
      monkeys[monkey] = '(' + first + ' ' + monkeys[monkey]['action'] + ' ' + second + ')';
      currentMonkey = monkey;
    };
  });

  for (let i = 0; i < 50; i++) {
    Object.keys(monkeys).forEach((monkey) => {
      const first = monkeys[monkey]['first'];
      const second = monkeys[monkey]['second'];
      if (first === currentMonkey) {
        monkeys[monkey] = '(' + monkeys[currentMonkey] + ' ' + monkeys[monkey]['action'] + ' ' + second + ')';
        currentMonkey = monkey;
      } else if (second === currentMonkey) {
        monkeys[monkey] = '(' + first + ' ' + monkeys[monkey]['action'] + ' ' + monkeys[currentMonkey] + ')';
        currentMonkey = monkey;
      }
    });
  }

  let formula;
  let equality;

  const [left, right] = monkeys['root'].split(' = ');
  if (left.includes('humn')) {
    formula = left.slice(1);
    equality = Number(right.slice(0, right.indexOf(')')));
  } else {
    formula = right.slice(0, right.indexOf(')'));
    equality = Number(left.slice(1));
  }

  // console.log(formula, equality);


  function clean(formula, equality) {

    while (formula !== 'humn') {

      if (formula[0] !== '(' && formula[0] !== 'h') {
        const value = Number(formula.slice(0, formula.indexOf(' ')))
        switch (formula[formula.indexOf(' ') + 1]) {
          case '+':
            equality -= value;
            break;
          case '-':
            equality = value - equality;
            break;
          case '*':
            equality /= value;
            break;
          case '/':
            equality = value / equality;
            break;
        }
        formula = formula.slice(formula.indexOf(' ') + 3);
      }

      if (formula[formula.length - 1] !== ')' && formula[formula.length - 1] !== 'n') {
        const value = Number(formula.slice(formula.lastIndexOf(' ') + 1));
        switch (formula[formula.lastIndexOf(' ') - 1]) {
          case '+':
            equality -= value;
            break;
          case '-':
            equality += value;
            break;
          case '*':
            equality /= value;
            break;
          case '/':
            equality *= value;
            break;
        }
        formula = formula.slice(0, formula.lastIndexOf(' ') - 2);
      };

      if (formula[0] === '(' && formula[formula.length - 1] === ')') {
        formula = formula.slice(1, formula.length - 1);
      };
    };
    return (equality);
  };

  console.log(clean(formula, equality));
  // console.log(monkeysYelled);

});