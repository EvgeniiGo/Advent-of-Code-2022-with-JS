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

  counter = 0;
  function checkVisibility(height, line, column) {
    // Check top
    let isLargest = true;
    for (let i = 0; i < line; i++) {
      if (input[i][column] >= height) {
        isLargest = false;
        break;
      }
    }
    if (isLargest) {
      return true
    }

    // Check bottom
    isLargest = true;
    for (let i = line + 1; i < input.length; i++) {
      if (input[i][column] >= height) {
        isLargest = false;
        break;
      }
    }
    if (isLargest) {
      return true
    }

    // Check left
    isLargest = true;
    for (let j = 0; j < column; j++) {
      if (input[line][j] >= height) {
        isLargest = false;
        break;
      }
    }
    if (isLargest) {
      return true;
    }

    // Check right
    isLargest = true;
    for (let j = column + 1; j < input[line].length; j++) {
      if (input[line][j] >= height) {
        isLargest = false;
        break;
      }
    }
    if (isLargest) {
      return true;
    }
  }

  // check visibility of every tree
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      // if tree is already on the edge just add to it the counter of visible trees
      if (i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1) {
        counter += 1;
      } else {
        if (checkVisibility(input[i][j], i, j)) {
          // console.log(input[i][j]);
          counter += 1;
        };
      }
    }
  }

  console.log(counter);

});