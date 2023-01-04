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

  let counter = 0;  // counter for part 1
  let counter2 = 0; // counter for part 2

  // check every pair
  input.forEach((pair) => {
    // split min and max values for every pair
    const [first, second] = pair.split(',');
    const [minFirst, maxFirst] = first.split('-');
    const [minSecond, maxSecond] = second.split('-');

    // comparison for part 1
    if (
      (Number(minFirst) <= Number(minSecond) && Number(maxFirst) >= Number(maxSecond))
      ||
      (Number(minSecond) <= Number(minFirst) && Number(maxSecond) >= Number(maxFirst))
    ) {
      counter += 1;
    }

    // comparison for part 2
    if (
      (Number(minFirst) <= Number(minSecond) && Number(maxFirst) >= Number(minSecond)) ||
      (Number(minSecond) <= Number(minFirst) && Number(maxSecond) >= Number(minFirst)) ||
      (Number(minFirst) <= Number(maxSecond) && Number(maxFirst) >= Number(maxSecond)) ||
      (Number(minSecond) <= Number(maxFirst) && Number(maxSecond) >= Number(maxFirst))
    ) {
      counter2 += 1;
    }
  })

  console.log(counter);
  console.log(counter2);

  // Part 2
})