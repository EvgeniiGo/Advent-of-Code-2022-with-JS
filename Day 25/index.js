
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

  function converSnafu(num) {
    let snafu = num;
    let number = 0;
    while (snafu.length > 0) {
      switch (snafu[0]) {
        case '=':
          number -= (2 * (5 ** (snafu.length - 1)));
          break;
        case '-':
          number -= (5 ** (snafu.length - 1));
          break;
        case '0':
          break;
        case '1':
          number += (5 ** (snafu.length - 1));
          break;
        case '2':
          number += (2 * (5 ** (snafu.length - 1)));
      }
      snafu = snafu.slice(1);
    }
    return number;
  }

  function convertNumber(num) {
    let number = num;
    let snafu = '';
    let power = 0;

    for (let i = 0; i < Object.keys(maxPowers).length; i++) {
      if (maxPowers[i] >= number) {
        power = i;
        break;
      }
    }
    if (number > powers[power]) {
      snafu += '2';
      number -= (2 * (5 ** power));
    } else {
      snafu = '1';
      number -= (5 ** power);
    }
    while (power >= 1) {
      power--;
      // console.log('number:', number);
      // console.log('power', power)
      if (number <= (-powers[power])) {
        snafu += '=';
        number += (2 * (5 ** power));
      } else if (number < 0 && number >= -powers[power] && number < -maxPowers[power - 1]) {
        snafu += '-';
        number += (5 ** power);
      } else if (number > 0 && number <= powers[power] && number > maxPowers[power - 1]) {
        snafu += '1';
        number -= (5 ** power);
      } else if (number >= powers[power]) {
        snafu += '2';
        number -= (2 * (5 ** power));
      } else {
        snafu += '0';
      }

    }
    return snafu;
  }

  const totalDec = input.reduce((total, snafu) => {
    return (total + converSnafu(snafu))
  }, 0);

  console.log(totalDec)

  const maxPowers = {};
  const powers = {};
  let i = 0

  while (true) {
    let maxNumber = (2 * (5 ** i)) + maxPowers[i - 1] || 2;
    let number = (5 ** i) + maxPowers[i - 1] || 2;
    maxPowers[i] = maxNumber;
    powers[i] = number;
    if (maxPowers[i] >= totalDec) {
      break;
    }
    i++;
  }
  // console.log(maxPowers);
  // console.log(powers);
  const code = convertNumber(totalDec);
  console.log(code);
  console.log(converSnafu(code))


});