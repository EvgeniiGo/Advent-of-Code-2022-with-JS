const { Console } = require('console');
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
  const patternMap = {};
  const rocksMap = [];

  // main loop for falling rocks
  while (rocksTotalCounter < 5000) {
    while (chamber[0] === '.......') {
      chamber.shift();
    }
    rocksMap.push(chamber.length);
    // before second rock of the every five starts falling
    if (rocksTotalCounter % 5 === 1) {
      patternMap[rocksTotalCounter] = { 'height': chamber.length, 'gas': gasesNum };
      // console.log(chamber.length, gasesNum, rocksTotalCounter);
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

  let isPatternFound = false;
  const keys = Object.keys(patternMap);
  for (let i = 0; i < keys.length - 1; i++) {
    if (isPatternFound) {
      break;
    }
    for (let j = i + 1; j < keys.length; j++) {
      if (isPatternFound) {
        break;
      }
      // if gases are the same, check next gases too
      if (patternMap[keys[j]]['gas'] === patternMap[keys[i]]['gas']) {
        isPatternFound = true;
        const distance = patternMap[keys[j]]['height'] - patternMap[keys[i]]['height']
        for (let z = 1; z < keys.length - j; z++) {
          if (patternMap[keys[j + z]]['gas'] !== patternMap[keys[i + z]]['gas']) {
            isPatternFound = false;
            break;
          }
          if (distance !== patternMap[keys[j + z]]['height'] - patternMap[keys[i + z]]['height']) {
            isPatternFound = false;
            break;
          }
        }
        if (isPatternFound) {
          const [first, second] = [keys[i], keys[j]];
          const rocksInPattern = second - first;
          const unitsInPattern = patternMap[second]['height'] - patternMap[first]['height'];
          console.log('Pattern starts on the', first, 'rock');
          console.log('Pattern includes:', rocksInPattern, 'rocks and', unitsInPattern, 'units');
          const patternsTotal = Math.floor((1000000000000 - first) / rocksInPattern);
          const remainder = (1000000000000 - first) % rocksInPattern;
          const unitsInRemainder = rocksMap[Number(first) + remainder] - rocksMap[first];
          console.log('In 1000000000000 rocks pattern appears', patternsTotal, 'times');
          console.log('After last pattern finished,', remainder, 'more rocks grounded');
          const totalUnits = patternMap[first]['height'] + (patternsTotal * unitsInPattern) + unitsInRemainder;
          console.log('Total height of 1000000000000 rocks contains of:')
          console.log('Before pattern, there are', rocksMap[first], 'units');
          console.log('There are', patternsTotal * unitsInPattern, 'units in patterns');
          console.log('After last pattern there are', unitsInRemainder, 'units');
          console.log('Total units are:', totalUnits);

          break;
        }

      }
    }
  }
});
