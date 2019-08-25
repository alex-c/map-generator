const seedrandom = require('seedrandom');

function RandomIntegerGenerator(seed) {
  if (seed) {
    if (typeof seed == 'string') {
      this.rng = seedrandom.alea(seed);
    } else {
      this.rng = seedrandom.alea(seed.toString());
    }
  } else {
    this.rng = Math.random;
  }
}

RandomIntegerGenerator.prototype.random = function(min, max) {
  return Math.floor(this.rng() * (max - min)) + min;
};

module.exports = RandomIntegerGenerator;
