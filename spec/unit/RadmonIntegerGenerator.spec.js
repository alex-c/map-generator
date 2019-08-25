const RandomIntegerGenerator = require('../../RandomIntegerGenerator.js');

function numbersAreInRange(numbers, min, max) {
  for (number of numbers) {
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThan(max);
  }
}

describe('RandomIntegergenerator:', function() {
  let generator;

  describe('random generation', function() {
    generator = new RandomIntegerGenerator();

    it('should produce 500 random integers between 0 and 5', function() {
      const numbers = [];
      for (let i = 0; i < 500; i++) {
        numbers.push(generator.random(0, 5));
      }
      numbersAreInRange(numbers, 0, 5);
    });
  });

  describe('seeded generation', function() {
    generator = new RandomIntegerGenerator('test');

    it('should produce exactly the 5 expected integers', function() {
      const numbers = [];
      for (let i = 0; i < 5; i++) {
        numbers.push(generator.random(0, 10));
      }
      expect(numbers).toEqual([0, 4, 1, 0, 7]);
    });
  });
});
