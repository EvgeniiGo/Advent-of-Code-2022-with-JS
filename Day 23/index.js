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

  let emptyLine = '.';
  for (let i = 1; i < input[0].length; i++) {
    emptyLine += '.';
  };

  const height = input.length;
  // add empty lines on top and bottom
  for (let i = 0; i < height; i++) {
    input.unshift(emptyLine);
    input.push(emptyLine);
  };

  for (let i = 0; i < input.length; i++) {
    input[i] = emptyLine + input[i] + emptyLine;
    input[i] = input[i].split('');
  }

  let map = [...input];

  let directionsOrder = ['N', 'S', 'W', 'E'];

  const rounds = 10;

  function hasNeighbour(x, y) {
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (i === x && j === y) {
          continue;
        } else {
          if (map[i][j] !== '.' && map[i][j] !== '@') {
            return true;
          }
        }
      };
    };
    return false;
  }

  function findDirections(x, y) {
    const directions = [];
    if (
      (map[x - 1][y - 1] === '.' || map[x - 1][y - 1] === '@')
      && (map[x - 1][y] === '.' || map[x - 1][y] === '@')
      && (map[x - 1][y + 1] === '.' || map[x - 1][y + 1] === '@')
    ) {
      directions.push('N');
    }
    if (
      (map[x + 1][y - 1] === '.' || map[x + 1][y - 1] === '@')
      && (map[x + 1][y] === '.' || map[x + 1][y] === '@')
      && (map[x + 1][y + 1] === '.' || map[x + 1][y + 1] === '@')
    ) {
      directions.push('S');
    }
    if (
      (map[x - 1][y - 1] === '.' || map[x - 1][y - 1] === '@')
      && (map[x][y - 1] === '.' || map[x][y - 1] === '@')
      && (map[x + 1][y - 1] === '.' || map[x + 1][y - 1] === '@')
    ) {
      directions.push('W');
    }
    if (
      (map[x - 1][y + 1] === '.' || map[x - 1][y + 1] === '@')
      && (map[x][y + 1] === '.' || map[x][y + 1] === '@')
      && (map[x + 1][y + 1] === '.' || map[x + 1][y + 1] === '@')
    ) {
      directions.push('E');
    }
    return directions;
  }

  for (let r = 1; r < Infinity; r++) {
    let elfMoved = false;
    // find possible points for movement
    for (let i = 0; i < map.length; i++) {
      if (!map[i].includes('#')) {
        continue;
      }
      // find every elf
      for (j = 0; j < map[i].length; j++) {
        if (map[i][j] !== '#') {
          continue;
        }
        // check if elf can move (if he has neighbours)
        const canMove = hasNeighbour(i, j);
        if (canMove) {

          // find possible directions to move for this elf (where he does not have neighbours)
          const possibleDirections = findDirections(i, j);
          // if elf has possible direction to move (he is not blocked by his neighbors)
          if (possibleDirections.length > 0) {
            for (let d = 0; d < 4; d++) {
              if (possibleDirections.includes(directionsOrder[d])) {
                // check that no one else moved here and make a move
                switch (directionsOrder[d]) {
                  case 'N':
                    if (map[i - 1][j] !== '@') {
                      map[i - 1][j] = '@';
                      map[i][j] = 'N';
                    } else {
                      map[i - 1][j] = '.';
                      map[i - 2][j] = '#';
                    }
                    break;
                  case 'S':
                    if (map[i + 1][j] !== '@') {
                      map[i + 1][j] = '@';
                      map[i][j] = 'S';
                    } else {
                      map[i + 1][j] = '.';
                      map[i + 2][j] = '#';
                    }
                    break;
                  case 'W':
                    if (map[i][j - 1] !== '@') {
                      map[i][j - 1] = '@';
                      map[i][j] = 'W';
                    } else {
                      map[i][j - 1] = '.';
                      map[i][j - 2] = '#';
                    }
                    break;
                  case 'E':
                    if (map[i][j + 1] !== '@') {
                      map[i][j + 1] = '@';
                      map[i][j] = 'E';
                    } else {
                      map[i][j + 1] = '.';
                      map[i][j + 2] = '#';
                    }
                    break;
                }
                break;
              }
            }
          }
        }
      }
    }

    // map.forEach((line) => console.log(line.join('')))
    // make moves if possible
    for (let i = 0; i < map.length; i++) {
      for (j = 0; j < map[i].length; j++) {

        // if some elf should move here - find him
        if (map[i][j] === '@') {
          if (map[i - 1][j] === 'S') {
            map[i - 1][j] = '.';
            map[i][j] = '#';
          } else if (map[i + 1][j] === 'N') {
            map[i + 1][j] = '.';
            map[i][j] = '#';
          } else if (map[i][j - 1] === 'E') {
            map[i][j - 1] = '.';
            map[i][j] = '#';
          } else if (map[i][j + 1] === 'W') {
            map[i][j + 1] = '.';
            map[i][j] = '#';
          }
          elfMoved = true;
        }
      }

      // update directions order and the map

      // map.forEach((line) => console.log(line))
      // map.forEach((line) => console.log(line))
    }
    if (!elfMoved) {
      console.log('no elf moved in round', r);
      break;
    }
    directionsOrder = [...directionsOrder.slice(1), directionsOrder[0]];
  }
  // console.log(map)
  // map.forEach((line) => console.log(line.join('')))

  // find rectangle
  let minX = Infinity;
  let maxX = 0;
  let minY = Infinity;
  let maxY = 0;

  for (let i = 0; i < map.length; i++) {
    if (!map[i].includes('#')) {
      continue;
    } else {
      if (i > maxX) {
        maxX = i;
      }
      if (i < minX) {
        minX = i;
      }
    };

    for (j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '#') {
        continue;
      } else {
        if (j > maxY) {
          maxY = j;
        }
        if (j < minY) {
          minY = j
        }
      }
    };
  };

  let counter = 0;
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (map[i][j] === '.') {
        counter += 1;
      }
    }
  }
  console.log(counter);

});