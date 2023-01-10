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

  // prototype of robot object
  const robot = {
    'ore': 0,
    'clay': 0,
    'obsidian': 0
  };

  const geodes = {};
  const robots = {};
  const maxTime = 33;

  function maxPossibleGeodes(geodeRobots, geodeResources, timeLeft) {
    let currentGeodes = geodeResources;
    for (let i = 0; i < timeLeft; i++) {
      currentGeodes += geodeRobots + i;
    }
    return currentGeodes;
  }

  input.forEach((line) => {
    id = line.split(':')[0].slice(10);
    console.log('Starting blueprint', id);
    const oreRobot = { ...robot };
    const clayRobot = { ...robot };
    const obsidianRobot = { ...robot };
    const geodeRobot = { ...robot };

    // creating cost object for costs of robot types
    oreRobot['ore'] = Number(line.slice(line.indexOf('costs') + 6, line.indexOf(' ore.')));
    clayRobot['ore'] = Number(line.slice(line.indexOf('clay') + 17, line.indexOf(' ore. Each obsidian')));
    obsidianRobot['ore'] = Number(line.slice(line.indexOf('obsidian') + 21, line.indexOf(' ore and')));
    obsidianRobot['clay'] = Number(line.slice(line.indexOf('and') + 4, line.indexOf(' clay. Each geode')));
    geodeRobot['ore'] = Number(line.slice(line.indexOf('geode') + 18, line.lastIndexOf(' ore')));
    geodeRobot['obsidian'] = Number(line.slice(line.lastIndexOf('and') + 4, line.lastIndexOf(' obsidian.')));

    robots[id] = {
      'ore': oreRobot,
      'clay': clayRobot,
      'obsidian': obsidianRobot,
      'geode': geodeRobot
    }

    // object for robots we have
    const myRobots = {
      'ore': 1,
      'clay': 0,
      'obsidian': 0,
      'geode': 0
    }

    const resources = {
      'ore': 0,
      'clay': 0,
      'obsidian': 0,
      'geode': 0
    }

    const maxCosts = {};
    maxCosts['clay'] = robots[id]['obsidian']['clay'];
    maxCosts['obsidian'] = robots[id]['geode']['obsidian'];
    maxCosts['geode'] = Infinity;
    maxCosts['ore'] = 0;
    Object.keys(robots[id]).forEach((robot) => {
      if (robots[id][robot]['ore'] > maxCosts['ore']) {
        maxCosts['ore'] = robots[id][robot]['ore'];
      }
    });

    geodes[id] = 0;

    // try every Blueprint
    Object.keys(robots).forEach((id) => {
      // geodes counter
      move(1, id, resources, myRobots);
    });

    // function to make a move
    function move(minute, blueprint, updatedResources, updatedRobots, missed = []) {
      if (minute === maxTime) {
        return;
      }
      const time = minute;
      const id = blueprint;
      const myRobots = { ...updatedRobots };
      const resources = { ...updatedResources };

      if (maxPossibleGeodes(myRobots, resources, maxTime - time) <= geodes[id]) {
        return;
      }

      // Object for robots that can be greated on this minute
      const canBeCreated = [];

      // find all robots that can be created - from 1 to 4 of different type
      Object.keys(robots[id]).forEach((robot) => {
        let enough = true;
        // if we didn't miss creation last turn
        if (!missed.includes(robot)) {
          // check creating robot only if we have less than maximum cost for a new one
          if (myRobots[robot] < maxCosts[robot]) {
            Object.keys(robots[id][robot]).forEach((resource) => {
              // if not enough resources or if ore robot will collect less than it costs
              if (resources[resource] < robots[id][robot][resource]) {
                enough = false;
              }
            });
            if (enough) {
              canBeCreated.push(robot);
            };
          }
        }
      });

      // every robot collect resources
      Object.keys(myRobots).forEach((resource) => {
        resources[resource] += myRobots[resource];
      });
      if (canBeCreated.length > 0) {
        // always create geode if you can
        if (canBeCreated.includes('geode')) {
          const newResources = { ...resources };
          const newRobots = { ...myRobots };
          Object.keys(robots[id]['geode']).forEach((resource) => {
            newResources[resource] = newResources[resource] - robots[id]['geode'][resource];
          })
          newRobots['geode'] += 1;
          if (newResources['geode'] > geodes[id]) {
            geodes[id] = newResources['geode'];
          }
          move(time + 1, id, newResources, newRobots);
        } else { // for every other robot than can be created - create a robot (only one)
          canBeCreated.forEach((robot) => {
            const newResources = { ...resources };
            const newRobots = { ...myRobots };
            Object.keys(robots[id][robot]).forEach((resource) => {
              newResources[resource] = newResources[resource] - robots[id][robot][resource];
            })
            newRobots[robot] += 1;
            if (newResources['geode'] > geodes[id]) {
              geodes[id] = newResources['geode'];
            }
            move(time + 1, id, newResources, newRobots)
          });
        }
      }

      // if not every type of robot can be created - we can miss a move to collect more resources
      if (canBeCreated.length !== 4) {
        if (canBeCreated.length === 0) {
          move(time + 1, id, resources, myRobots, missed);
        }
        // if we can create only 1 type of robot - we can try to wait
        if (canBeCreated.length === 1) {
          move(time + 1, id, resources, myRobots, canBeCreated.concat(missed));
        }
        // if we can create 2 robots but we don't have clay robot (no point to miss a move)
        if (canBeCreated.length === 2 && myRobots['clay'] > 0) {
          move(time + 1, id, resources, myRobots, canBeCreated.concat(missed));
        }
        // if we can create 3 robots but we don't have obsidian robot (no point to miss a move)
        if (canBeCreated.length === 3 && myRobots['obsidian'] > 0) {
          move(time + 1, id, resources, myRobots, canBeCreated.concat(missed));
        }
      };
    };
  });
  console.log(geodes);
  let quality = 0;
  Object.keys(geodes).forEach((id) => {
    quality += Number(id) * geodes[id];
  });
  // for Part 1 change maxTime to 25
  // console.log('Part 1:', quality);
  // for Part 2 change maxTime to 33
  console.log('Part 2:', Object.keys(geodes).reduce((total, id) => {
    return (total * geodes[id]);
  }, 1));
});
