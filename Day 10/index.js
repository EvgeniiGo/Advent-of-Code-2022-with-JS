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

  let cycle = 0;    // number of cycle
  let register = 1; // register X
  let signal = 0;     // total signal strength
  const cycles = [20, 60, 100, 140, 180, 220]; //points for signal strength calculation
  let CRT = '';

  // Function for Part 1
  function checkCycle() {
    if (cycles.includes(cycle)) {
      signal += cycle * register;
    }
  }

  // Function for Part 2
  function checkSprite() {
    if (CRT.length <= 240) {
      const sprite = [register - 1, register, register + 1];
      if (sprite.includes(CRT.length % 40)) {
        CRT += '#';
      } else {
        CRT += '.';
      }
    }
  }

  // go through every instruction
  input.forEach((instruction) => {
    // if it's a noop do nothing
    if (instruction === 'noop') {
      cycle += 1;
      checkSprite();
      checkCycle();
    } else {
      cycle += 1;
      checkSprite();
      checkCycle();
      cycle += 1;
      checkSprite();
      checkCycle();
      register += Number(instruction.split(' ')[1]);
    }
  })

  console.log(signal);

  for (let i = 0; i < 240; i += 40) {
    console.log(CRT.slice(i, i + 40));
  }


});