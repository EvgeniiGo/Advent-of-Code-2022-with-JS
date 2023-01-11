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
  input = input.split('\r\n');
  // console.log(input);

  const monkeys = {};
  const monkeysYelled = {};

  // dividing monkeys to 2 groups
  input.forEach((job) => {
    const line = job.split(' ');
    const name = line[0].slice(0, line[0].indexOf(':'))
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
  });
  while (Object.keys(monkeys).length > 0) {
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
  }

  console.log(monkeysYelled['root']);

});