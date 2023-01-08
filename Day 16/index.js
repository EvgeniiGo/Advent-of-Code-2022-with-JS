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

  data = {}; // main object with all the data
  const time = 30; // time we have to spend
  const valvesWithFlow = ['AA']; // valves with flow and starting valve to build distances
  const distances = {};

  // go through all the input and build map object
  input.forEach((valve) => {
    const name = valve.slice(6, 8); // name of the valve
    data[name] = {};

    const rate = Number(valve.slice(23, valve.indexOf(';'))); // flow rate of the valve
    data[name]['rate'] = rate;
    if (rate > 0) {
      valvesWithFlow.push(name);
    }
    const tunnels = valve.includes('valves')
      ? valve.slice(valve.indexOf('valves') + 7).split(', ')
      : [valve.slice(valve.indexOf('valve') + 6)];
    data[name]['tunnels'] = tunnels;
  })

  // build distances object from every valve with flow to another valve with flow
  valvesWithFlow.forEach((name) => {
    const map = {};

    // function to go from one valve to another
    function move(name) {
      data[name]['tunnels'].forEach((valve) => {
        if (!(map[valve] < map[name] + 1)) {
          map[valve] = map[name] + 1;
          move(valve);
        };
      })
    }

    map[name] = 0;
    move(name);
    delete map[name];

    distances[name] = map;
  });

  valvesWithFlow.shift(); // delete starting valve because it has no flow

  // go between valves with flow and find the maximum pressure to release
  let maxRelease = 0;

  function findRelease(valve, release, timeLeft, visited) {
    valvesWithFlow.forEach((name) => {
      if (!visited.includes(name) && timeLeft - distances[valve][name] - 1 > 0) {
        // calculate how much will be released till the time ends
        const newRelease = release + (timeLeft - distances[valve][name] - 1) * data[name]['rate'];
        const time = timeLeft - distances[valve][name] - 1; // updates the time
        const newVisited = [...visited, name] // add current valve to the list of visited valves
        // if current release is bigger than previous maximum - update maximum
        if (newRelease > maxRelease) {
          maxRelease = newRelease;
        }
        findRelease(name, newRelease, time, newVisited); // recursion
      }
    })
  };

  findRelease('AA', 0, time, []);
  console.log(maxRelease);
});
