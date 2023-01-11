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

  const map = input[0].split('\r\n');
  const path = input[1].split('').join('');

  // our current position on the map and direction - starting in left top corner
  const position = {
    'x': 0,
    'y': map[0].indexOf('.'),
    'd': 90
  };

  function move(steps) {
    for (let i = 0; i < steps; i++) {
      const [x, y, d] = Object.values(position);
      switch (d) {
        case 90:
          if (map[x].length === y + 1) {
            for (let j = 0; j < y; j++) {
              if (map[x][j] === '#') {
                return;
              } else if (map[x][j] === '.') {
                position['y'] = j;
                break;
              }
            }
          } else if (map[x][y + 1] === '.') {
            position['y'] += 1;
          } else if (map[x][y + 1] === '#') {
            return;
          }
          break;

        case 270:
          if (map[x][y - 1] === ' ' || y === 0) {
            for (let j = map[x].length - 1; j > y; j--) {
              if (map[x][j] === '#') {
                return;
              } else if (map[x][j] === '.') {
                position['y'] = j;
                break;
              }
            }
          } else if (map[x][y - 1] === '.') {
            position['y'] -= 1;
          } else if (map[x][y - 1] === '#') {
            return;
          }
          break;

        case 180:
          if (map.length - 1 === x || map[x + 1][y] === ' ' || map[x + 1][y] === undefined) {
            for (let j = 0; j < x; j++) {
              if (map[j][y] === '#') {
                return;
              } else if (map[j][y] === '.') {
                position['x'] = j;
                break;
              }
            }
          } else if (map[x + 1][y] === '.') {
            position['x'] += 1;
          } else if (map[x + 1][y] === '#') {
            return;
          }
          break;

        case 0:
          if (x === 0 || map[x - 1][y] === ' ' || map[x - 1][y] === undefined) {
            for (let j = map.length - 1; j > x; j--) {
              if (map[j][y] === '#') {
                return;
              } else if (map[j][y] === '.') {
                position['x'] = j;
                break;
              }
            }
          } else if (map[x - 1][y] === '.') {
            position['x'] -= 1;
          } else if (map[x - 1][y] === '#') {
            return;
          }
          break;
      }
    }
  };

  function changeDirection(direction) {
    const change = direction === 'l' ? -90 : 90;
    position['d'] += change;
    if (position['d'] >= 360) {
      position['d'] %= 360;
    };
    if (position['d'] < 0) {
      position['d'] += 360;
    }
  }

  for (let i = 0; i < path.length; i++) {
    if (path[i] === 'L') {
      changeDirection('l');
    } else if (path[i] === 'R') {
      changeDirection('r');
    } else {
      // find closest direction change
      const closestL = path.slice(i).indexOf('L') !== -1 ? path.slice(i).indexOf('L') + i : Infinity;
      const closestR = path.slice(i).indexOf('R') !== -1 ? path.slice(i).indexOf('R') + i : Infinity;
      const index = closestL > closestR ? closestR : closestL;
      const number = Number(path.slice(i, index));

      move(number);
      i += String(number).length - 1;
    }
  }

  console.log(position);
  const dValue = position['d'] !== 0 ? position['d'] / 90 - 1 : 4;
  console.log(((position['x'] + 1) * 1000) + ((position['y'] + 1) * 4) + (dValue))


});