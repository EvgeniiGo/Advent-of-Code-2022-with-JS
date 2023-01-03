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

  let maxCal = 0;       // max amount of calories for elf
  let maxCal2 = 0;      // second max amount
  let maxCal3 = 0;      // third max amount

  // Splitting input data by empty line
  input = input.split('\r\n\r\n');

  // Calculation of calories for every elf
  input.forEach((elf) => {
    // Splitting elf's data by line
    const calsArray = elf.split('\r\n');

    // find amount of calories for current elf
    const currentCal = calsArray.reduce((total, snack) => {
      return Number(total) + Number(snack);
    })

    // compare current amount with max amount
    if (currentCal > maxCal) {
      maxCal3 = maxCal2;
      maxCal2 = maxCal;
      maxCal = currentCal;
    } else if (currentCal > maxCal2) {
      maxCal3 = maxCal2;
      maxCal2 = currentCal;
    } else if (currentCal > maxCal3) {
      maxCal3 = currentCal;
    }
  })

  console.log(Number(maxCal) + Number(maxCal2) + Number(maxCal3));
})





