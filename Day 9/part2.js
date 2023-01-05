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

  const map = {}; // map object
  map['0,0'] = '#'; // starting point, # for every point tail 10 visited

  const tails = {}; // object with positions of all 10 tails (including head as 0)
  for (let i = 0; i < 10; i++) {
    tails[i] = { 'tailX': 0, 'tailY': 0 };
  }

  // function for every step of the head
  function makeHeadStep(direction) {
    // up
    if (direction === 'U') {
      tails[0]['tailX'] -= 1;
    }

    // down
    if (direction === 'D') {
      tails[0]['tailX'] += 1;
    }

    // left
    if (direction === 'L') {
      tails[0]['tailY'] -= 1;
    }

    // right
    if (direction === 'R') {
      tails[0]['tailY'] += 1;
    }
  }

  // function for every step of the tail
  function makeTailStep(tail) {
    const xDist = Math.abs(tails[tail - 1]['tailX'] - tails[tail]['tailX']); // ver distance
    const yDist = Math.abs(tails[tail - 1]['tailY'] - tails[tail]['tailY']); // hor distance

    // check if step should happened (if the distance more than 1 step)
    if (xDist <= 1 && yDist <= 1) {
      return;
    }

    // diagonal step - if one of the distances more than 1 and another is 1 or more
    else if ((xDist > 1 && yDist >= 1) || (xDist >= 1 && yDist > 1)) {
      // step up or down
      tails[tail - 1]['tailX'] > tails[tail]['tailX']
        ? tails[tail]['tailX'] += 1
        : tails[tail]['tailX'] -= 1;

      // step left or right
      tails[tail - 1]['tailY'] > tails[tail]['tailY']
        ? tails[tail]['tailY'] += 1
        : tails[tail]['tailY'] -= 1;
    }

    // step up or down
    else if (xDist > 1) {
      tails[tail - 1]['tailX'] > tails[tail]['tailX']
        ? tails[tail]['tailX'] += 1
        : tails[tail]['tailX'] -= 1;
    }

    // step left or right
    else if (yDist > 1) {
      tails[tail - 1]['tailY'] > tails[tail]['tailY']
        ? tails[tail]['tailY'] += 1
        : tails[tail]['tailY'] -= 1;
    }

    if (tail === 9) {
      // update map
      const point = tails[tail]['tailX'] + ',' + tails[tail]['tailY'];
      map[point] = '#';
    }
  };

  // go through every move of the rope
  input.forEach((move) => {
    const [direction, steps] = move.split(' ');
    for (let i = 0; i < steps; i++) {
      makeHeadStep(direction);
      for (let j = 1; j <= 9; j++) {
        makeTailStep(j);
      }
    }
  });

  console.log(Object.keys(map).length);

});