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

  const system = {};
  let currentDir = '/';

  // Go through every line and build system object with all directories and files
  input.forEach((line) => {
    // If line start with $ sign
    if (line[0] === '$') {
      // If it's a command to change directory
      if (line.slice(2, 4) === 'cd') {
        // If we need to go out of current directory
        if (line.slice(5) === '..') {
          currentDir = currentDir.slice(0, currentDir.lastIndexOf('/'));
        }
        // If we need to go to the starting directory
        else if (line.slice(5) == '/') {
          currentDir = '/';
          system[currentDir] = { ...system[currentDir] } || {};
        }
        // If we need to go inside directory
        else {
          currentDir += `/${line.slice(5)}`;
          system[currentDir] = { ...system[currentDir] } || {};
        }
        // If it's ls - do nothing
      } else if (line.slice(0, 3) === 'dir') {
        system[currentDir]
      }
    }
    // If this is directory
    else if (line.slice(0, 3) === 'dir') {
      system[`${currentDir}/${line.slice(4)}`] = {};
    }
    // If this is a file
    else {
      const [size, name] = line.split(' ');
      system[currentDir][name] = size;
    }
  })
  // console.log(system)

  const sizes = {};
  // function to count size of directory
  function countSize(dirName) {
    sizes[dirName] = 0;
    for (file in system[dirName]) {
      sizes[dirName] += Number(system[dirName][file]);
    }
  }

  // count sizes for every directory
  for (dir in system) {
    countSize(dir);
  }

  // add sizes of inner directories to the outer directories
  for (currentDir in sizes) {
    for (checkDir in sizes) {
      if (currentDir !== checkDir && checkDir.startsWith(currentDir)) {
        sizes[currentDir] += sizes[checkDir];
      }
    }
  }

  // PART 1
  // summarize all directories with a size at most 100000
  let sum = 0;
  for (dir in sizes) {
    if (sizes[dir] <= 100000) {
      sum += sizes[dir];
    }
  }
  console.log(sum);

  // PART 2
  const totalSpace = 70000000; // Total space available
  const usedSpace = sizes['/']; // used space
  const freeSpace = totalSpace - usedSpace; // free space
  // if we don't have enough free space
  if (freeSpace < 30000000) {
    const needToFreeSpace = 30000000 - freeSpace; // space we need to free
    let minDir = Infinity; // directory with minimum but enough space to free by deletion
    for (dir in sizes) {
      // if directory has enough size to free space
      if (sizes[dir] > needToFreeSpace) {
        // if size of the directory is smaller than we already found
        if (sizes[dir] < minDir) {
          minDir = sizes[dir];
        }
      }
    }
    console.log(minDir);
  }

});