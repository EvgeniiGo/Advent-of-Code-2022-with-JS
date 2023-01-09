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

  let part1 = 0;
  let part2 = 0;

  const rocks = [];
  input.forEach((line) => {
    rocks.push(line);
  })
  // console.log(rocks);
  xS = new Set;
  yS = new Set;
  zS = new Set;
  for (rock of rocks) {
    let [x, y, z] = rock.split(',');
    xS.add(Number(x));
    yS.add(Number(y));
    zS.add(Number(z));
  }

  const minX = Math.min(...xS);
  const maxX = Math.max(...xS);
  const minY = Math.min(...yS);
  const maxY = Math.max(...yS);
  const minZ = Math.min(...zS);
  const maxZ = Math.max(...zS);

  deltas = ['1,0,0', '-1,0,0', '0,1,0', '0,-1,0', '0,0,1', '0,0,-1'];

  function canGetOut(x, y, z) {
    const queue = [];
    queue.push(x + ',' + y + ',' + z);
    seen = new Set;

    while (queue.length > 0) {
      const rock = queue.shift();
      if ([...seen].includes(rock)) {
        continue;
      }
      seen.add(rock);
      if (rocks.includes(rock)) {
        continue;
      }

      // console.log(rock);
      let [x, y, z] = rock.split(',');
      x = Number(x); y = Number(y); z = Number(z);

      if (x > maxX || x < minX || y > maxY || y < minY || z > maxZ || z < minZ) {
        return true;
      }

      deltas.forEach((delta) => {
        let [dx, dy, dz] = delta.split(',');
        dx = Number(dx); dy = Number(dy); dz = Number(dz);
        queue.push((x + dx) + ',' + (y + dy) + ',' + (z + dz))
      });
    }
    return false;
  }

  for (rock of rocks) {
    let [x, y, z] = rock.split(',');
    x = Number(x); y = Number(y); z = Number(z);
    deltas.forEach((delta) => {
      let [dx, dy, dz] = delta.split(',');
      dx = Number(dx); dy = Number(dy); dz = Number(dz);
      if (!rocks.includes((x + dx) + ',' + (y + dy) + ',' + (z + dz))) {
        part1 += 1;
      }
      if (canGetOut(x + dx, y + dy, z + dz)) {
        part2 += 1;
      }
    })
  }
  console.log(part1);
  console.log(part2);
});