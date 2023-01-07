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

  const cave = []; // main object

  // function to draw a straight line from one point to next point
  function drawLine(startX, startY, endX, endY) {
    if (startX < endX) {
      for (let i = startX + 1; i <= endX; i++) {
        cave[startY][i] = '#';
      }
    }

    if (startY < endY) {
      for (let i = startY + 1; i <= endY; i++) {
        cave[i] = cave[i] || [];
        cave[i][startX] = '#';
      }
    }

    if (startX > endX) {
      for (let i = startX - 1; i >= endX; i--) {
        cave[startY][i] = '#';
      }
    }

    if (startY > endY) {
      for (let i = startY - 1; i >= endY; i--) {
        cave[i] = cave[i] || [];
        cave[i][startX] = '#';
      }
    }
  }

  // go through every line of input to build cave system
  input.forEach((path) => {
    const paths = path.split(' -> ');
    let [currentX, currentY] = paths[0].split(',');
    currentX = Number(currentX);
    currentY = Number(currentY);
    // go through every point of path
    paths.forEach((point, index) => {
      if (index === 0) {
        cave[currentY] = cave[currentY] || [];
        cave[currentY][currentX] = '#';
      } else {
        let [x, y] = point.split(',');
        x = Number(x);
        y = Number(y);
        drawLine(currentX, currentY, x, y);
        currentX = x;
        currentY = y;
      }
    });
  })

  let units = 0; // units of send came to rest
  let [x, y] = [500, 0]; // sand starting point

  // start sandfall
  while (true) {
    cave[y] = cave[y] || [];
    if (y === cave.length - 1) {
      break;
    }
    while (true) {
      cave[y + 1] = cave[y + 1] || [];
      if (!['#', '*'].includes(cave[y + 1][x])) {
        y += 1;
        if (y === cave.length - 1) {
          break;
        }
      } else if (!['#', '*'].includes(cave[y + 1][x - 1])) {
        y += 1;
        x -= 1;
      } else if (!['#', '*'].includes(cave[y + 1][x + 1])) {
        y += 1;
        x += 1;
      } else {
        cave[y][x] = '*';
        units += 1;
        [x, y] = [500, 0];
        break;
      }
    }
  }

  console.log(units);
});
