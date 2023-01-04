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

  // converting input to the crates object
  const cratesInput = input[0].split('\r\n');
  const lastLine = cratesInput.pop();  // line with stack numbers
  const stacks = Number(lastLine[lastLine.length - 2]);  // total number of stacks
  const crates = {}; // object for crates

  // build every stack inside crates obj
  for (let i = cratesInput.length - 1; i >= 0; i--) {
    for (let j = 0; j < stacks; j++) {
      crates[j + 1] = crates[j + 1] || [];
      if (cratesInput[i][j * 4 + 1] !== ' ') {
        crates[j + 1].push(cratesInput[i][j * 4 + 1])
      }
    }
  }


  // move crates
  const moves = input[1].split('\r\n');
  moves.forEach((move) => {
    move = move.split(' ');

    // PART 1 MOVING ALGORITHM
    // for (let i = 1; i <= Number(move[1]); i++) {
    //   crates[move[5]].push(crates[move[3]].pop());
    // }

    // PART 2 MOVING ALGORITHM
    const indexOfSlice = crates[move[3]].length - Number(move[1]);
    crates[move[5]].push(...crates[move[3]].slice(indexOfSlice));
    crates[move[3]] = crates[move[3]].slice(0, indexOfSlice);

    // console.log(crates);
  });

  // find top crates in every stack
  let message = '';
  for (stack in crates) {
    message += (crates[stack][crates[stack].length - 1]);
  }

  console.log(message);
});