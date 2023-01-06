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

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  let start = [];
  let end = [];
  const map = [];
  let maxSteps = Infinity;

  // build map object for step numbers, find start and end points
  for (let i = 0; i < input.length; i++) {
    map[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      map[i].push('*');
      if (input[i][j] === 'S') {
        start = [i, j]; // starting point
        map[i][j] = 0;
      }

      if (input[i][j] === 'E') {
        end = [i, j]; // ending point
      }
    }
  }

  // function to find all possible neighbours for point
  function getNeighbours(point) {
    const [x, y] = [point[0], point[1]];
    const neighbours = [];

    if (x >= 1) { neighbours.push([x - 1, y]) };
    if (x < input.length - 1) { neighbours.push([x + 1, y]) };
    if (y >= 1) { neighbours.push([x, y - 1]) };
    if (y < input[x].length - 1) { neighbours.push([x, y + 1]) };

    return neighbours;
  }

  // get Value of the letter
  function getValue(letter) {
    return alphabet.indexOf(letter);
  }

  // main function
  function move(point) {
    const [x, y] = [point[0], point[1]];
    const neighbours = getNeighbours([x, y]);
    const value = getValue(input[x][y]);

    // go through every neighbour
    neighbours.forEach((neighbour) => {
      const [i, j] = [neighbour[0], neighbour[1]];

      // treat 'E' as 'z'
      const nValue = input[i][j] === 'E'
        ? alphabet.indexOf('z')
        : getValue(input[i][j]);

      // if neighbour is not to big
      if (nValue - value <= 1) {
        // if there is no better way yet
        if (map[i][j] === '*' || map[i][j] > map[x][y] + 1) {
          map[i][j] = map[x][y] + 1;
          // if this is end point
          if (input[i][j] === 'E') {
            if (map[i][j] < maxSteps) {
              maxSteps = map[i][j];
            }
          }
          // recursion
          move([i, j]);
        }
      }
    });
  };

  move(start);
  console.log(maxSteps);

});
