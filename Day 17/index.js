const fs = require('fs');
let input;

// Reading input data from file
fs.readFile('./input.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  gases = data;
  // console.log(input);

  // shapes of rocks in their falling order
  const rocks = [];
  rocks[0] = ['..@@@@.'];
  rocks[1] = [
    '...@...',
    '..@@@..',
    '...@...'
  ];
  rocks[2] = [
    '....@..',
    '....@..',
    '..@@@..'
  ];
  rocks[3] = [
    '..@....',
    '..@....',
    '..@....',
    '..@....'
  ]
  rocks[4] = [
    '..@@...',
    '..@@...'
  ]

  let chamber = [];

  let rocksTotalCounter = 0; // counter for total number of rocks
  let rockNum = 0; // number of current rock shape (to keep track which rock should fall)
  let gasesNum = 0; // number of current gas (to keep track which gas should move the rock) 

  // main loop for falling rocks
  while (rocksTotalCounter < 2022) {
    while (chamber[0] === '.......') {
      chamber.shift();
    }
    chamber = rocks[rockNum].concat('.......', '.......', '.......', chamber); // add rock to the chamber's top
    const rockX = rocks[rockNum].length; // number of rows in current rock
    rockNum = rockNum < 4 ? rockNum + 1 : 0; // update shape for the next rock

    // loop for falling of current rock
    while (true) {
      let isStopped = false;
      // go through all the chamber, find the rock (@) and try to move it with gases
      for (let l = 0; l < chamber.length; l++) {
        if (gases[gasesNum] === '<') {
          // if rock is in the line and he is not on the edge
          if (chamber[l].includes('@')) {
            // find rectangle with rock
            const rectangle = chamber.slice(l, l + rockX);
            // if every point on the left from the rock is empty
            if (rectangle.every((line) => line.includes('.@'))) {
              // move rock to the left
              for (let i = l; i < l + rockX; i++) {
                x = chamber[i].indexOf('@');
                lastX = chamber[i].lastIndexOf('@');
                chamber[i] = chamber[i].slice(0, x - 1) + chamber[i].slice(x, lastX + 1) + '.' + chamber[i].slice(lastX + 1);
              };
              break;
            };
          }
        } else if (gases[gasesNum] === '>') {
          if (chamber[l].includes('@')) {
            // find rectangle with rock
            const rectangle = chamber.slice(l, l + rockX);
            // if every point on the left from the rock is empty
            if (rectangle.every((line) => line.includes('@.'))) {
              // move rock to the right
              for (let i = l; i < l + rockX; i++) {
                const x = chamber[i].indexOf('@');
                const lastX = chamber[i].lastIndexOf('@');
                chamber[i] = chamber[i].slice(0, x) + '.' + chamber[i].slice(x, lastX + 1) + chamber[i].slice(lastX + 2);
              };
              break;
            };
          }
        }
      }
      // go through all the chamber, find the rock (@) and try to move it down
      for (let l = 0; l < chamber.length; l++) {
        // if rock is on the floor
        if (l === chamber.length - 1) {
          for (let i = l; i > l - rockX; i--) {
            // replace all @ with #
            chamber[i] = chamber[i].replaceAll('@', '#');
          }
          gasesNum = gasesNum < gases.length - 1 ? gasesNum + 1 : 0;
          rocksTotalCounter += 1;
          isStopped = true;
          break;
        }
        // if this is the last line of the rock
        if (chamber[l].includes('@') && !chamber[l + 1].includes('@')) {
          let canFall = true;
          // check if the rock can fall down
          for (let i = l; i > l - rockX; i--) {
            const x = chamber[i].indexOf('@');
            const lastX = chamber[i].lastIndexOf('@');
            if (!(chamber[i + 1].slice(x, lastX + 1)).split('').every((point) => {
              return (point === '.' || point === '@');
            })) {
              canFall = false;
            }
          } // if rock can fall down
          if (canFall === true) {
            for (let i = l; i > l - rockX; i--) {
              const x = chamber[i].indexOf('@');
              const lastX = chamber[i].lastIndexOf('@');
              chamber[i + 1] = chamber[i + 1].slice(0, x) + chamber[i].slice(x, lastX + 1) + chamber[i + 1].slice(lastX + 1);
              chamber[i] = chamber[i].replaceAll('@', '.');
            };
            gasesNum = gasesNum < gases.length - 1 ? gasesNum + 1 : 0;
            break;
          } // if rock should stop
          else {
            for (let i = l; i > l - rockX; i--) {
              // replace all @ with #
              chamber[i] = chamber[i].replaceAll('@', '#');
            }
            gasesNum = gasesNum < gases.length - 1 ? gasesNum + 1 : 0;
            rocksTotalCounter += 1;
            isStopped = true;
            break;
          }
        }
      }
      // break if the rock stopped
      if (isStopped) {
        break;
      }
    }
  }

  // clean empty lines
  while (chamber[0] === '.......') {
    chamber.shift();
  }
  console.log(chamber.length);
});
