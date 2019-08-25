const MapGenerator = require('../../');

function expectMapSize(map, width, height) {
  expect(map.length).toBe(height);
  for (let row of map) {
    expect(row.length).toBe(width);
  }
}

function isMapEmpty(map) {
  let empty = true;
  for (let row of map) {
    for (let field of row) {
      if (field !== 0) {
        empty = false;
        break;
      }
    }
    if (empty === false) {
      break;
    }
  }
  return empty;
}

describe('MapGenerator:', function() {
  const generator = new MapGenerator();

  describe('generateEmptyMap method:', function() {
    it('should generate an empty 30x30 map', function() {
      const map = generator.generateEmptyMap(20, 30);
      expectMapSize(map, 20, 30);
      expect(isMapEmpty(map)).toBe(true);
    });
  });

  describe('step method:', function() {
    it('should step 1 to left', function() {
      const [x, y] = generator.step(3, 3, [-1, 0]);
      expect(x).toBe(2);
      expect(y).toBe(3);
    });

    it('should step 1 to right', function() {
      const [x, y] = generator.step(3, 3, [1, 0]);
      expect(x).toBe(4);
      expect(y).toBe(3);
    });

    it('should step 1 down', function() {
      const [x, y] = generator.step(3, 3, [0, -1]);
      expect(x).toBe(3);
      expect(y).toBe(2);
    });

    it('should step 1 up', function() {
      const [x, y] = generator.step(3, 3, [0, 1]);
      expect(x).toBe(3);
      expect(y).toBe(4);
    });
  });

  describe('validatePosition method:', function() {
    const map3x3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    it('smallest valid position', function() {
      const positionIsValid = generator.validatePosition(map3x3, 0, 0);
      expect(positionIsValid).toBe(true);
    });

    it('hieghest valid position', function() {
      const positionIsValid = generator.validatePosition(map3x3, 2, 2);
      expect(positionIsValid).toBe(true);
    });

    it('negative x position', function() {
      const positionIsValid = generator.validatePosition(map3x3, -1, 0);
      expect(positionIsValid).toBe(false);
    });

    it('negative y position', function() {
      const positionIsValid = generator.validatePosition(map3x3, 0, -1);
      expect(positionIsValid).toBe(false);
    });

    it('x position too great', function() {
      const positionIsValid = generator.validatePosition(map3x3, 3, 0);
      expect(positionIsValid).toBe(false);
    });

    it('y position too great', function() {
      const positionIsValid = generator.validatePosition(map3x3, 0, 3);
      expect(positionIsValid).toBe(false);
    });
  });

  describe('map generation', function() {
    it('default parameters', function() {
      const map = generator.generateMap();
      expectMapSize(map, 30, 30);
      expect(isMapEmpty(map)).toBe(false);
    });

    it('custom parameters', function() {
      const map = generator.generateMap({ maxWidth: 14, maxHeight: 16, startPosition: { x: 2, y: 3 } });
      expectMapSize(map, 14, 16);
      expect(isMapEmpty(map)).toBe(false);
      expect(map[3][2]).toBe(1);
    });

    it('seeded generation', function() {
      const maps = [];
      const config = { seed: 'seed_of_doom' };
      for (let i = 0; i < 25; i++) {
        maps.push(generator.generateMap(config));
      }
      for (let i = 1; i < 25; i++) {
        expect(maps[i]).toEqual(maps[0]);
      }
    });
  });
});
