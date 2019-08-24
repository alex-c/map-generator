function RandomIntegerGenerator(rng) {
  this.rng = rng || Math.random;
}

RandomIntegerGenerator.prototype.random = function(min, max) {
  return Math.floor(this.rng() * (max - min)) + min;
};

module.exports = RandomIntegerGenerator;
