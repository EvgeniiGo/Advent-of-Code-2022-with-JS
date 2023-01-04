const fs = require('fs');
let input;

// Reading input data from file
fs.readFile('./input.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  input = data;
  console.log(input);

  let marker = '';

  // PART 1
  // Go through whole sequence of letters
  // for (let i = 0; i < input.length; i++) {
  //   // If it's repetition - make a cut
  //   if (marker.includes(input[i])) {
  //     marker = marker.slice(marker.indexOf(input[i]) + 1)
  //   }
  //   marker += input[i];
  //   if (marker.length === 4) {
  //     console.log(i + 1);
  //     return;
  //   }
  // }

  // PART 2
  // Go through whole sequence of letters
  for (let i = 0; i < input.length; i++) {
    // If it's repetition - make a cut
    if (marker.includes(input[i])) {
      marker = marker.slice(marker.indexOf(input[i]) + 1)
    }
    marker += input[i];
    if (marker.length === 14) {
      console.log(i + 1);
      return;
    }
  }
})
