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
  const sensors = []
  const maxX = 4000000;
  const maxY = 4000000;

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
    sensors.push({ 'x': sensorX, 'y': sensorY, 'distance': distance });
  });

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      let isBlocked = false;
      sensors.forEach((sensor) => {

        // find distance between sensor and point
        const distance = Math.abs(sensor['y'] - y) + Math.abs(sensor['x'] - x);
        if (y === 8 && x === 0) {
        }
        if (distance <= sensor['distance']) {
          isBlocked = true;
          x += sensor['distance'] - distance;
        }
      });
      if (!isBlocked) {
        console.log('Following point is not blocked:', y, x);
        console.log('Frequency is:', x * 4000000 + y);

        break;
      }
    }
  }

});
