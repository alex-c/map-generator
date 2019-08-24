const RandomIntegerGenerator = require('../../RandomIntegerGenerator.js');

function numbersAreInRange(numbers, min, max) {
  for (number of numbers) {
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThan(max);
  }
}

describe('RandomIntegergenerator tests', function() {
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
});
