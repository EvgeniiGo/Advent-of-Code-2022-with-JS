
const fs = require('fs');
let input;

function deepCopy(arr) {
  let copy = [];
  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
  })
  return copy;
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
  // console.log(input);

  const map = input.map((line) => line.split(''));
  const start = input[0].indexOf('.');
  const finish = input[input.length - 1].indexOf('.');
  const startingPosition = { 'x': 0, 'y': start };
  const positions = {};

  const directions = ['<', '>', '^', 'v'];

  let lMap = [];
  let rMap = [];
  let uMap = [];
  let dMap = [];

  let lMap2;
  let rMap2;
  let uMap2;
  let dMap2;

  let lMap3;
  let rMap3;
  let uMap3;
  let dMap3;

  for (let i = 0; i < map.length; i++) {
    lMap.push([]);
    rMap.push([]);
    uMap.push([]);
    dMap.push([]);
    for (let j = 0; j < map[i].length; j++) {
      if (!directions.includes(map[i][j])) {
        lMap[i].push(map[i][j]);
        rMap[i].push(map[i][j]);
        uMap[i].push(map[i][j]);
        dMap[i].push(map[i][j]);
      } else {
        if (map[i][j] === '<') {
          lMap[i].push(map[i][j]);
          rMap[i].push('.');
          uMap[i].push('.');
          dMap[i].push('.');
        } else if (map[i][j] === '>') {
          lMap[i].push('.');
          rMap[i].push(map[i][j]);
          uMap[i].push('.');
          dMap[i].push('.');
        } else if (map[i][j] === '^') {
          lMap[i].push('.');
          rMap[i].push('.');
          uMap[i].push(map[i][j]);
          dMap[i].push('.');
        } else if (map[i][j] === 'v') {
          lMap[i].push('.');
          rMap[i].push('.');
          uMap[i].push('.');
          dMap[i].push(map[i][j]);
        };
      };
    }
  }

  function step(stepsCounter, position, leftMap, rightMap, upMap, downMap) {
    const steps = stepsCounter + 1;
    // console.log(steps, position);
    if (steps >= minSteps) {
      return;
    }
    const x = position['x'];
    const y = position['y'];

    // if distance to the finish make better solution not possible
    if (((map.length - 1 - x) + (finish - y) + steps - 1) >= minSteps) {
      return;
    }

    positions[steps] = positions[steps] || [];
    if (positions[steps].includes(x + ',' + y)) {
      return;
    } else {
      positions[steps].push(x + ',' + y);
    }

    const lMap = deepCopy(leftMap);
    const rMap = deepCopy(rightMap);
    const uMap = deepCopy(upMap);
    const dMap = deepCopy(downMap);

    const uLine = uMap[1].slice();
    const dLine = dMap[dMap.length - 2].slice();
    for (let i = 1; i < map.length - 1; i++) {
      lMap[i] = ['#', ...lMap[i].slice(2, lMap[i].length - 1), lMap[i][1], '#'];
      rMap[i] = ['#', rMap[i][rMap[i].length - 2], ...rMap[i].slice(1, rMap[i].length - 2), '#'];
      if (i !== uMap.length - 2) {
        uMap[i] = [...uMap[i + 1]];
      } else {
        uMap[i] = [...uLine];
      }
      if (i !== dMap.length - 2) {
        dMap[dMap.length - 1 - i] = [...dMap[dMap.length - 2 - i]];
      } else {
        dMap[1] = [...dLine];
      }
    }

    // console.log(lMap[1].length)

    function checkCell(x, y) {
      if (lMap[x][y] !== '.' || rMap[x][y] !== '.' || uMap[x][y] !== '.' || dMap[x][y] !== '.') {
        return false;
      } else {
        return true;
      }
    };

    if (checkCell(x, y + 1)) {
      const newPosition = { 'x': x, 'y': y + 1 };
      step(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (checkCell(x + 1, y)) {
      if ((x + 1) === (map.length - 1) && y === finish) {
        if (steps < minSteps) {
          minSteps = steps;
          console.log('minSteps updated:', minSteps);
          lMap2 = deepCopy(lMap);
          rMap2 = deepCopy(rMap);
          uMap2 = deepCopy(uMap);
          dMap2 = deepCopy(dMap);
        }
        return;
      }
      const newPosition = { 'x': x + 1, 'y': y };
      step(steps, newPosition, lMap, rMap, uMap, dMap);
    }



    if (checkCell(x, y - 1)) {
      const newPosition = { 'x': x, 'y': y - 1 };
      step(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (x > 0) {
      if (checkCell(x - 1, y)) {
        const newPosition = { 'x': x - 1, 'y': y };
        step(steps, newPosition, lMap, rMap, uMap, dMap);
      }
    }

    if (checkCell(x, y)) {
      const newPosition = { 'x': x, 'y': y };
      step(steps, newPosition, lMap, rMap, uMap, dMap);
    }
    return;
  }
  let minSteps = 300;
  let steps = 0;
  step(steps, startingPosition, lMap, rMap, uMap, dMap);
  console.log(minSteps);

  // way back
  function step2(stepsCounter, position, leftMap, rightMap, upMap, downMap) {
    const steps = stepsCounter + 1;
    // console.log(steps, position);
    if (steps >= minSteps2) {
      return;
    }
    const x = position['x'];
    const y = position['y'];

    // if distance to the finish make better solution not possible
    if (((x) + (Math.abs(y - start)) + steps - 1) >= minSteps2) {
      return;
    }

    positions2[steps] = positions2[steps] || [];
    if (positions2[steps].includes(x + ',' + y)) {
      return;
    } else {
      positions2[steps].push(x + ',' + y);
    }

    const lMap = deepCopy(leftMap);
    const rMap = deepCopy(rightMap);
    const uMap = deepCopy(upMap);
    const dMap = deepCopy(downMap);

    const uLine = uMap[1].slice();
    const dLine = dMap[dMap.length - 2].slice();
    for (let i = 1; i < map.length - 1; i++) {
      lMap[i] = ['#', ...lMap[i].slice(2, lMap[i].length - 1), lMap[i][1], '#'];
      rMap[i] = ['#', rMap[i][rMap[i].length - 2], ...rMap[i].slice(1, rMap[i].length - 2), '#'];
      if (i !== uMap.length - 2) {
        uMap[i] = [...uMap[i + 1]];
      } else {
        uMap[i] = [...uLine];
      }
      if (i !== dMap.length - 2) {
        dMap[dMap.length - 1 - i] = [...dMap[dMap.length - 2 - i]];
      } else {
        dMap[1] = [...dLine];
      }
    }

    // console.log(lMap[1].length)

    function checkCell(x, y) {
      if (lMap[x][y] !== '.' || rMap[x][y] !== '.' || uMap[x][y] !== '.' || dMap[x][y] !== '.') {
        return false;
      } else {
        return true;
      }
    };

    if (checkCell(x, y - 1)) {
      const newPosition = { 'x': x, 'y': y - 1 };
      step2(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (checkCell(x - 1, y)) {
      if ((x - 1) === 0 && y === start) {
        if (steps < minSteps2) {
          minSteps2 = steps;
          console.log('minSteps2 updated:', minSteps2);
          lMap3 = deepCopy(lMap);
          rMap3 = deepCopy(rMap);
          uMap3 = deepCopy(uMap);
          dMap3 = deepCopy(dMap);
        }
        return;
      }
      const newPosition = { 'x': x - 1, 'y': y };
      step2(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (checkCell(x, y + 1)) {
      const newPosition = { 'x': x, 'y': y + 1 };
      step2(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (x < map.length - 1) {
      if (checkCell(x + 1, y)) {
        const newPosition = { 'x': x + 1, 'y': y };
        step2(steps, newPosition, lMap, rMap, uMap, dMap);
      }
    }

    if (checkCell(x, y)) {
      const newPosition = { 'x': x, 'y': y };
      step2(steps, newPosition, lMap, rMap, uMap, dMap);
    }
    return;
  }

  let positions2 = {};
  let minSteps2 = 300;
  steps = 0;
  let newPosition = { 'x': map.length - 1, 'y': finish };
  step2(steps, newPosition, lMap2, rMap2, uMap2, dMap2);
  console.log(minSteps2);

  // way forward again
  function step3(stepsCounter, position, leftMap, rightMap, upMap, downMap) {
    // console.log(stepsCounter, position)
    const steps = stepsCounter + 1;
    if (steps >= minSteps3) {
      return;
    }
    const x = position['x'];
    const y = position['y'];

    // if distance to the finish make better solution not possible
    if (((map.length - 1 - x) + (finish - y) + steps - 1) >= minSteps3) {
      return;
    }

    positions3[steps] = positions3[steps] || [];
    if (positions3[steps].includes(x + ',' + y)) {
      return;
    } else {
      positions3[steps].push(x + ',' + y);
    }

    const lMap = deepCopy(leftMap);
    const rMap = deepCopy(rightMap);
    const uMap = deepCopy(upMap);
    const dMap = deepCopy(downMap);

    const uLine = uMap[1].slice();
    const dLine = dMap[dMap.length - 2].slice();
    for (let i = 1; i < map.length - 1; i++) {
      lMap[i] = ['#', ...lMap[i].slice(2, lMap[i].length - 1), lMap[i][1], '#'];
      rMap[i] = ['#', rMap[i][rMap[i].length - 2], ...rMap[i].slice(1, rMap[i].length - 2), '#'];
      if (i !== uMap.length - 2) {
        uMap[i] = [...uMap[i + 1]];
      } else {
        uMap[i] = [...uLine];
      }
      if (i !== dMap.length - 2) {
        dMap[dMap.length - 1 - i] = [...dMap[dMap.length - 2 - i]];
      } else {
        dMap[1] = [...dLine];
      }
    }

    function checkCell(x, y) {
      if (lMap[x][y] !== '.' || rMap[x][y] !== '.' || uMap[x][y] !== '.' || dMap[x][y] !== '.') {
        return false;
      } else {
        return true;
      }
    };

    if (checkCell(x, y + 1)) {
      const newPosition = { 'x': x, 'y': y + 1 };
      step3(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (checkCell(x + 1, y)) {
      if ((x + 1) === (map.length - 1) && y === finish) {
        if (steps < minSteps3) {
          minSteps3 = steps;
          console.log('minSteps updated:', minSteps3);
        }
        return;
      }
      const newPosition = { 'x': x + 1, 'y': y };
      step3(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (checkCell(x, y - 1)) {
      const newPosition = { 'x': x, 'y': y - 1 };
      step3(steps, newPosition, lMap, rMap, uMap, dMap);
    }

    if (x > 0) {
      if (checkCell(x - 1, y)) {
        const newPosition = { 'x': x - 1, 'y': y };
        step3(steps, newPosition, lMap, rMap, uMap, dMap);
      }
    }

    if (checkCell(x, y)) {
      const newPosition = { 'x': x, 'y': y };
      step3(steps, newPosition, lMap, rMap, uMap, dMap);
    }
    return;
  }

  let minSteps3 = 300;
  let positions3 = {};
  steps = 0;
  step3(steps, startingPosition, lMap3, rMap3, uMap3, dMap3);
  console.log(minSteps3);

  console.log(minSteps, minSteps2, minSteps3);
  console.log('Total time:', minSteps + minSteps2 + minSteps3, 'minutes');

});