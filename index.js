const RandomIntegerGenerator = require('./RandomIntegerGenerator');

function MapGenerator() {
  this.defaultRng = new RandomIntegerGenerator();
  this.directions = [
    [-1, 0], //left
    [1, 0], //right
    [0, -1], //down
    [0, 1], //up
  ];
}

// Generates an empty map of dimensions width*height
MapGenerator.prototype.generateEmptyMap = function(width, height) {
  const map = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      map[y].push(0);
    }
  }
  return map;
};

// Steps in a given direction based on (x,y)-coordinates and returns the new position
MapGenerator.prototype.step = function(x, y, direction) {
  return [x + direction[0], y + direction[1]];
};

// Validates an (x,y)-position to be inside the boundaries of a given map
MapGenerator.prototype.validatePosition = function(map, x, y) {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

// Generates a map based on the passed configuration
MapGenerator.prototype.generateMap = function(mapConfig) {
  // Make config parameter optional
  mapConfig = mapConfig || {};

  // Default configuration overwritten if needed
  const config = {
    numberOfPaths: mapConfig.numberOfPaths || 30,
    minPathLength: mapConfig.minPathLength || 5,
    maxPathLength: mapConfig.maxPathLength || 12,
    maxWidth: mapConfig.maxWidth || 30,
    maxHeight: mapConfig.maxHeight || 30,
    startPosition: mapConfig.startPosition || { x: -1, y: -1 },
    seed: mapConfig.seed || null,
  };

  // Set rng function
  const rng = config.seed ? new RandomIntegerGenerator(config.seed) : this.defaultRng;

  // Generate empty map
  const map = this.generateEmptyMap(config.maxWidth, config.maxHeight);

  // Ensure a valid starting position
  if (!this.validatePosition(map, config.startPosition.x, config.startPosition.y)) {
    config.startPosition.x = rng.random(0, config.maxWidth);
    config.startPosition.y = rng.random(0, config.maxHeight);
  }

  //Initialize variables needed during generation
  let x = config.startPosition.x;
  let y = config.startPosition.y;
  let direction;
  let lastDirection;
  let pathLength;

  // Start position is a room
  map[y][x] = 2;

  // Generate paths
  for (let i = 0; i < config.numberOfPaths; i++) {
    // Select a path length
    pathLength = rng.random(config.minPathLength, config.maxPathLength + 1);

    // Select direction, which allows at least one step, and is different from the previous direction
    do {
      direction = this.directions[rng.random(0, this.directions.length)];
    } while (
      !this.validatePosition(map, ...this.step(x, y, direction)) ||
      (lastDirection && direction == lastDirection)
    );

    // Step until path length or map boundary reached
    for (var j = 0; j < pathLength; j++) {
      // Check if step is possible
      if (!this.validatePosition(map, ...this.step(x, y, direction))) {
        break;
      }
      // Perform step
      [x, y] = this.step(x, y, direction);
      map[y][x] = 1;
    }

    //Store last direction
    lastDirection = direction;
  }

  //Done generating!
  return map;
};

module.exports = MapGenerator;
