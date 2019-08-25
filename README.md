# mapgenerator

`mapgenerator` generates dungeon-like 2d maps of connected spaces using either random walk or procedural generation from a seed. Maps are generated as arrays of number arrays, in which 0 means there is no path/room at the given coordinates, and 1 means that there is.

Example output:

```javascript
map =[[0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [0, 1, 1, 0, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0]]
```

Accessing a map location at coordinates (x, y) is done with `map[y][x]`. With the (0, 0) coordinate at the bottom left, the map above represents the following map:

```javascript
    +---+---+---+---+---+
y=4 | 0 | 0 | 0 | 0 | 0 |
    +---+---+---+---+---+
    | 0 | 0 | 1 | 1 | 1 |
    +---+---+---+---+---+
    | 0 | 1 | 1 | 0 | 1 |
    +---+---+---+---+---+
    | 0 | 0 | 0 | 0 | 1 |
    +---+---+---+---+---+
y=0 | 0 | 0 | 0 | 0 | 1 |
    +---+---+---+---+---+
     x=0             x=4
```

## Installation

Install with `npm`: `npm install --save mapgenerator`.

## Usage

The package exposes a `MapGenerator` class.

```javascript
// Import package
const MapGenerator = require('mapgenerator');

// Instantiate a generator
const generator = new MapGenerator();
```

Call the `generateMap` method to generate maps.

```javascript
// Generate a random map with default parameters
const map1 = generator.generateMap();

// Generate a map from a seed
const map2 = generator.generateMap({
  seed: 'my-awesome-seed'
});
```

### Map generation parameters

The following map generation parameters are available:

```javascript
// Generate a map with custom parameters
const map = generator.generateMap({
    numberOfPaths: 10,           // Number of paths to draw
    minPathLength: 1,            // Minimal length of a path
    maxPathLength: 5,            // Maximal length of a path
    maxWidth: 24,                // Maximum width of the map - x index will go from 0 to 23
    maxHeight: 18,               // Maximum height of the map - y index will go from 0 to 17
    startPosition: {x: 0, y: 0}  // Position at which to start drawint paths
    seed: 'some-other-seed'      // Seed for procedural generation
});
```

Maps generated with a given seed and the same parameters will always produce the same map!

## Other methods

Other `MapGenerator` methods that are used internally but are also exposed:

- `generateEmptyMap(width: number, height: number): number[][]`: Generates an empty map of dimensions `width*height`.
- `step(x: number, y: number, direction: number[]): number[]`: Returns new coordinates from the given coordinates by stepping to the left (`[-1, 0]`), right (`[1, 0]`), up (`[0, 1]`) or down (`[0, -1]`).
- `validatePosition(map: number[][], x: number, y: number): boolean`: Returns whether a given position is within the bounds of the map.