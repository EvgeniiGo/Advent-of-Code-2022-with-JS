const fs = require('fs');
let input;

// A, X - Rock, 1 point
// B, Y - Paper, 2 points
// C, Z - Scissors, 3 points
// Win - 6 points, Draw - 3 points, Loose - 0 points
const rules = {
  'A': {
    'X': 4, // Draw
    'Y': 8, // Win
    'Z': 3,  // Loose
  },
  'B': {
    'X': 1, // Loose
    'Y': 5,  // Draw
    'Z': 9,  // Win
  },
  'C': {
    'X': 7,  // Win
    'Y': 2,  // Loose
    'Z': 6,  // Draw
  },
}

const rules2 = {
  'A': {
    'X': 3, // Loose
    'Y': 4, // Draw
    'Z': 8,  // Win
  },
  'B': {
    'X': 1, // Loose
    'Y': 5,  // Draw
    'Z': 9,  // Win
  },
  'C': {
    'X': 2,  // Loose
    'Y': 6,  // Draw
    'Z': 7,  // Win
  },
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

  let score = 0;
  let score2 = 0;

  // count every round and add to the score
  input.forEach((round) => {
    score += rules[round[0]][round[2]];
    score2 += rules2[round[0]][round[2]];
  })

  console.log(score);
  console.log(score2);
})