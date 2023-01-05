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
  map['0,0'] = '#'; // starting point, # for every point tail visited

  let [headX, headY] = [0, 0]; // position of the head
  let [tailX, tailY] = [0, 0]; // position of the tail

  // function for every step of the head
  function makeHeadStep(direction) {
    // up
    if (direction === 'U') {
      headX -= 1;
    }

    // down
    if (direction === 'D') {
      headX += 1;
    }

    // left
    if (direction === 'L') {
      headY -= 1;
    }

    // right
    if (direction === 'R') {
      headY += 1;
    }
  }

  // function for every step of the tail
  function makeTailStep() {
    const xDist = Math.abs(headX - tailX); // vertical distance
    const yDist = Math.abs(headY - tailY); // horizontal distance

    // check if step should happened (if the distance more than 1 step)
    if (xDist <= 1 && yDist <= 1) {
      return;
    }

    // diagonal step - if one of the distances more than 1 and another is 1
    else if ((xDist > 1 && yDist === 1) || (xDist === 1 && yDist > 1)) {
      headX > tailX ? tailX += 1 : tailX -= 1; // step up or down
      headY > tailY ? tailY += 1 : tailY -= 1; // step left or right
    }

    // step up or down
    else if (xDist > 1) {
      headX > tailX ? tailX += 1 : tailX -= 1;
    }

    // step left or right
    else if (yDist > 1) {
      headY > tailY ? tailY += 1 : tailY -= 1;
    }

    // update map
    const point = tailX + ',' + tailY;
    map[point] = '#';
  }


  // go through every move of the rope
  input.forEach((move) => {
    const [direction, steps] = move.split(' ');
    for (let i = 0; i < steps; i++) {
      makeHeadStep(direction);
      makeTailStep();
    }
  })


  console.log(Object.keys(map).length);

});