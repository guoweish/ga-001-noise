const SimpleNoise = require('simplex-noise');

function FBM() {}

FBM.prototype.setSeed = function(seedString) {
  this.seedString = seedString;
  this.noise = new SimpleNoise(this.seedString);
}

FBM.prototype.twoDim = function(px, py, h, lacunarity, octaves) {
  let value = 0;
  let reminder;
  let i;

  for(i=0; i<octaves; i++) {
    value += (this.noise.noise2D(px, py) * Math.pow(lacunarity, -h*i));
    px *= lacunarity;
    py *= lacunarity;
  }

  reminder = octaves - Math.floor(octaves);

  if(reminder > 0) {
    value += reminder * this.noise.noise2D(px, py) * Math.pow(lacunarity, -h*i);
  }

  return value;
}

FBM.prototype.twoDim = function(px, py, pz, h, lacunarity, octaves) {
  let value = 0;
  let reminder;
  let i;

  for(i=0; i<octaves; i++) {
    value += (this.noise.noise3D(px, py, pz) * Math.pow(lacunarity, -h*i));
    px *= lacunarity;
    py *= lacunarity;
    pz *= lacunarity;
  }

  reminder = octaves - Math.floor(octaves);

  if(reminder > 0) {
    value += reminder * this.noise.noise3D(px, py, pz) * Math.pow(lacunarity, -h*i);
  }

  return value;
}

module.exports = FBM;