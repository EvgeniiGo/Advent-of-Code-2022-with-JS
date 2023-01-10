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
  // console.log(String(input));

  input = input.map((number) => Number(number));

  const l = input.length; // length of the list
  let zeroId;

  const numbers = {};
  for (let i = 0; i < input.length; i++) {
    numbers[i] = {};
    numbers[i]['value'] = input[i];
    numbers[i]['position'] = i;
    if (input[i] === 0) {
      zeroId = i;
      console.log('zeroId:', zeroId);
    }
  }
  // console.log(numbers);

  const coordinates = [];

  Object.keys(numbers).forEach((id) => {
    const index = numbers[id]['position'];

    let newIndex = index + numbers[id]['value'];
    if (newIndex >= l) {
      while (newIndex > l) {
        newIndex -= l;
      };
      newIndex += 1;
    };
    if (newIndex < 0) {
      while (newIndex < 0) {
        newIndex += l;
      };
      newIndex -= 1;
    };
    // console.log(numbers[id]['value'], 'should move to position', newIndex);
    if (newIndex < index) {
      Object.keys(numbers).forEach((num) => {
        if (numbers[num]['position'] >= newIndex && numbers[num]['position'] < index) {
          numbers[num]['position'] += 1;
        }
      });
    } else if (newIndex > index) {
      Object.keys(numbers).forEach((num) => {
        if (numbers[num]['position'] <= newIndex && numbers[num]['position'] > index) {
          numbers[num]['position'] -= 1;
        }
      });
    }
    numbers[id]['position'] = newIndex;
    // console.log(numbers);
  });

  console.log(numbers[zeroId])
  // console.log(numbers)
  const start = numbers[zeroId]['position'];
  for (let i = 1000; i <= 3000; i += 1000) {
    let index = start + i;
    if (index >= l) {
      while (index >= l) {
        index -= l;
      };
    } else {
      index = start + i;
    }
    Object.keys(numbers).forEach((number) => {
      if (numbers[number]['position'] === index) {
        console.log(numbers[number]);
        coordinates.push(numbers[number]['value']);
      }
    });
  };

  // console.log(numbers);

  console.log(coordinates);
  console.log(coordinates.reduce((total, item) => total + item));


});
