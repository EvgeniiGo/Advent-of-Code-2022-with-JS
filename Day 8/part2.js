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

  let maxTreesCounter = 0;
  function checkVisibility(height, line, column) {
    let counter = 0;
    let multiplicator = 1;

    // Check top
    if (line !== 0) {
      for (let i = line - 1; i >= 0; i--) {
        counter += 1;
        if (input[i][column] >= height) {
          break;
        }
      }
    }
    multiplicator *= counter;
    counter = 0;

    // Check bottom
    if (line !== input.length - 1) {
      for (let i = line + 1; i < input.length; i++) {
        counter += 1;
        if (input[i][column] >= height) {
          break;
        }
      }
    }
    multiplicator *= counter;
    counter = 0;

    // Check left
    if (column !== 0) {
      for (let j = column - 1; j >= 0; j--) {
        counter += 1;
        if (input[line][j] >= height) {
          break;
        }
      }
    }
    multiplicator *= counter;
    counter = 0;

    // Check right
    if (column !== input[line].length - 1) {
      for (let j = column + 1; j < input[line].length; j++) {
        counter += 1;
        if (input[line][j] >= height) {
          break;
        }
      }
    }
    multiplicator *= counter;
    counter = 0;

    if (multiplicator > maxTreesCounter) {
      maxTreesCounter = multiplicator;
    }
  }

  // check visibility of every tree
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      checkVisibility(input[i][j], i, j)
    };
  }


  console.log(maxTreesCounter);

});