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

  const map = {};
  const row = 2000000; // row to check for blocked spots

  // go through all the sensors and beacons and draw them
  input.forEach((line) => {
    // extracting of coordinates
    const [sensor, beacon] = line.split(': ');
    const sensorX = Number(sensor.slice(sensor.indexOf('=') + 1, sensor.indexOf(',')));
    const sensorY = Number(sensor.slice(sensor.lastIndexOf('=') + 1));
    const beaconX = Number(beacon.slice(beacon.indexOf('=') + 1, beacon.indexOf(',')));
    const beaconY = Number(beacon.slice(beacon.lastIndexOf('=') + 1));
    const distance = Math.abs(sensorX - beaconX) + Math.abs((sensorY - beaconY));

    // add sensors and beacons to the map
    map[sensorY] = map[sensorY] || {};
    map[sensorY][sensorX] = 'S';
    map[beaconY] = map[beaconY] || {};
    map[beaconY][beaconX] = 'B';

    // block spots from the chosen row if they are inside the distance
    if (
      (sensorY < row && sensorY + distance >= row)
      || (sensorY > row && sensorY - distance <= row)
      || (sensorY === row)
    ) {
      const rowDist = Math.abs(row - sensorY); // straight distance from the sensor to the row
      const remainder = distance - rowDist; // remainder between distances
      map[row] = map[row] || {};
      // if there are some points to block
      for (let i = 0; i <= remainder; i++) {
        map[row][sensorX + i] = map[row][sensorX + i] || '#';
        map[row][sensorX - i] = map[row][sensorX - i] || '#';
      }
    }
  })

  const blocked = Object.values(map[row]).reduce((total, item) => {
    return total += item === '#' ? 1 : 0;
  }, 0);

  console.log(blocked);
});
