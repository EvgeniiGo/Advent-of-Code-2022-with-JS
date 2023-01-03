const fs = require('fs');
let input;

const priorities = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

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


  const items = [];

  // go trough every rucksack
  input.forEach((rucksack) => {
    // find middle index of the rucksack
    const m = (rucksack.length + 1) / 2;

    // split rucksack's string to compartments
    comp1 = rucksack.slice(0, m);
    comp2 = rucksack.slice(m);

    // check for every item in comp1 for comp2 and add same types to items array
    for (let i = 0; i < comp1.length; i++) {
      if (comp2.includes(comp1[i])) {
        items.push(comp1[i]);
        break;
      }
    }
  })

  let sum = 0;

  // count all priorities
  for (let type of items) {
    sum += Number(priorities.indexOf(type));
  }

  console.log(sum);

  // Part 2
  const stickers = [];

  // check every group of 3 elfs
  for (let i = 0; i < input.length; i += 3) {
    // check every item of the group with 2 and 3 groups
    for (let j = 0; j < input[i].length; j++) {
      if (input[i + 1].includes(input[i][j]) && input[i + 2].includes(input[i][j])) {
        stickers.push(input[i][j]);
        break;
      }
    };
  };

  let sum2 = 0;
  for (let type of stickers) {
    sum2 += Number(priorities.indexOf(type));
  }

  console.log(sum2);
})