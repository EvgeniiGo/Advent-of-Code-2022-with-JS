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

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let indices = 0; // sum of pairs in the right order

  function isEmpty(arr) {
    return arr === '' ? true : false;
  }

  function isOutOfItems(arr) {
    return arr.slice(0, 2) === '[]' || arr[0] === ']' ? true : false;
  }

  // get full integer from the line
  function getFullInt(arr) {
    let num = arr[0];
    for (let i = 1; i < arr.length; i++) {
      // if it's not a number - stop
      if (['[', ']', ','].includes(arr[i])) {
        return num;
      } else {
        num += arr[i];
      }
    }
    return num;
  }

  function compare(left, right) {

    // check if left or right is totally empty
    if (isEmpty(left)) {
      return true;
    }
    if (isEmpty(right)) {
      return false;
    }

    // check if there is empty array at the start
    if (isOutOfItems(left) && !isOutOfItems(right)) {
      return true;
    }
    if (!isOutOfItems(left) && isOutOfItems(right)) {
      return false;
    }

    // do some cleanup from the sides
    if (
      (left[0] === '[' && right[0] === '[')
      || (left[0] === ']' && right[0] === ']')
      || (left[0] === ',' && right[0] === ',')
    ) {
      left = left.slice(1);
      right = right.slice(1);
      return compare(left, right);
    }
    if (left[left.length - 1] === ']' && right[right.length - 1] === ']') {
      left = left.slice(0, left.length - 1);
      right = right.slice(0, right.length - 1);
      return compare(left, right);
    }

    // if there is one integer and one list - transform integer to list
    if (left[0] !== '[' && right[0] === '[') {
      const value = getFullInt(left);
      left = '[' + value + ']' + left.slice(value.length);
      return compare(left, right);
    }

    if (right[0] !== '[' && left[0] === '[') {
      const value = getFullInt(right);
      right = '[' + value + ']' + right.slice(value.length);
      return compare(left, right);
    }

    // if both values are integers
    if (numbers.includes(left[0]) && numbers.includes(right[0])) {
      const leftNum = getFullInt(left);
      const rightNum = getFullInt(right);
      // if left integer is smaller - we have right order
      if (Number(leftNum) < Number(rightNum)) {
        return true;
        // if right integer is smaller - we have wrong order
      } else if (Number(leftNum) > Number(rightNum)) {
        return false;
        // if integers are equal - we are continuing our comparison
      } else {
        left = left.slice(leftNum.length);
        right = right.slice(rightNum.length);
        return compare(left, right);
      }
    }

    // if at least one of the values is not integer - start again with cleanup
    if (!numbers.includes(left[0]) || !numbers.includes(right[0])) {
      return compare(left, right);
    }
  }

  input.forEach((pair, index) => {
    let [left, right] = pair.split('\r\n');
    if (compare(left, right)) {
      indices += index + 1;
    }
  })
  console.log(indices)

});
