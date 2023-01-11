// solution for part 1 is not mine
const fs = require('fs');
let input;

class Int {
  constructor(value) {
    this.value = value;
  }
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

  const key = 811589153;

  const mix = (numbers, n = 1) => {
    const result = [...numbers];

    while (n > 0) {
      for (const number of original) {
        const resultIdx = result.indexOf(number);
        result.splice(resultIdx, 1);
        let nextIdx = (resultIdx + number.value) % result.length;

        if (nextIdx < 0) {
          nextIdx += result.length;
        }

        result.splice(nextIdx, 0, number);
      }

      n -= 1;
    }

    return result;
  };


  const original = input.map(num => new Int(Number(num) * key));
  let mixed = mix([...original]);
  // for part 2
  for (let i = 0; i < 9; i++) {
    mixed = mix([...mixed]);
  };
  const zeroIdx = mixed.findIndex(num => num.value === 0);
  console.log([1000, 2000, 3000]
    .map(shift => mixed[(zeroIdx + shift) % mixed.length])
    .reduce((acc, num) => acc + num.value, 0));

});