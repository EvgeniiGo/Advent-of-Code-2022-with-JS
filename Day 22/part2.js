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
            if (y === 149) {
              if (map[149 - x][99] === '.') {
                position['x'] = 149 - x;
                position['y'] = 99;
                position['d'] = 270;
              } else {
                return;
              };
            } else if (y === 99 && x <= 99 && x >= 50) {
              if (map[49][x + 50] === '.') {
                position['x'] = 49;
                position['y'] = x + 50;
                position['d'] = 0;
              } else {
                return;
              };
            } else if (y === 99 && x <= 149 && x >= 100) {
              if (map[149 - x][149] === '.') {
                position['x'] = 149 - x;
                position['y'] = 149;
                position['d'] = 270;
              } else {
                return;
              };
            } else if (y === 49) {
              if (map[149][x - 100] === '.') {
                position['x'] = 149;
                position['y'] = x - 100;
                position['d'] = 0;
              } else {
                return;
              };
            };
          }

          else if (map[x][y + 1] === '.') {
            position['y'] += 1;
          } else if (map[x][y + 1] === '#') {
            return;
          }
          break;


        case 270:
          if (map[x][y - 1] === ' ' || y === 0) {
            if (y === 50 && x <= 49) {
              if (map[149 - x][0] === '.') {
                position['x'] = 149 - x;
                position['y'] = 0;
                position['d'] = 90;
              }
            } else if (y === 50 && x <= 99 && x >= 50) {
              if (map[100][x - 50] === '.') {
                position['x'] = 100;
                position['y'] = x - 50;
                position['d'] = 180;
              }
            } else if (y === 0 && x <= 149) {
              if (map[149 - x][50] === '.') {
                position['x'] = 149 - x;
                position['y'] = 50;
                position['d'] = 90;
              }
            } else if (y === 0 && x <= 199) {
              if (map[0][x - 100] === '.') {
                position['x'] = 0;
                position['y'] = x - 100;
                position['d'] = 180;
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
            if (x === 49) {
              if (map[y - 50][99] === '.') {
                position['x'] = y - 50;
                position['y'] = 99;
                position['d'] = 270;
              }
            } else if (x === 149) {
              if (map[y + 100][49] === '.') {
                position['x'] = y + 100;
                position['y'] = 49;
                position['d'] = 270;
              }
            } else if (x === 199) {
              if (map[0][y + 100] === '.') {
                position['x'] = 0;
                position['y'] = y + 100;
                position['d'] = 0;
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
            if (x === 0 && y <= 49) {
              if (map[y + 100][0] === '.') {
                position['x'] = y + 100;
                position['y'] = 0;
                position['d'] = 90;
              }
            } else if (x === 0 && y >= 50) {
              if (map[199][y - 100] === '.') {
                position['x'] = 199;
                position['y'] = y - 100;
                position['d'] = 0;
              }
            } else if (x === 100) {
              if (map[y + 50][50] === '.') {
                position['x'] = y + 50;
                position['y'] = 50;
                position['d'] = 90;
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