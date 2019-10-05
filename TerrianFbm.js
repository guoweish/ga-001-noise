const FBM = require('./fbm');

let fbm = new FBM();
fbm.setSeed('seed');

function TerrianFbm(width, height, segmentWidth, segmentHeight, scaleHeight, fbmOptions) {
  let geometry = {};
  geometry.positions = [];
  geometry.uvs = [];
  geometry.colors = [];
  geometry.indices = [];

  let h = fbmOptions&&fbmOptions.h || 0.7;
  let lacunarity = fbmOptions&&fbmOptions.lacunarity || 2;
  let octaves = fbmOptions&&fbmOptions.octaves || 8;

  let widthUnit = width / segmentWidth;
  let heightUnit = height / segmentHeight;

  for(let i=0; i<segmentWidth; i++) {
    for(let j=0; j<segmentHeight; j++) {
      let u = i / (segmentWidth - 1);
      let v = j / (segmentHeight - 1);
      geometry.uvs.push(u, v);

      let n = fbm.twoDim(u, v, h, lacunarity, octaves);

      let x = j * widthUnit;
      let y = n * scaleHeight;
      let z = i * heightUnit;
      geometry.positions.push(x, y, z);

      geometry.colors.push(n, n, n);
    }
  }

  for(let i=0; i<(segmentWidth - 1); i++) {
    for(let j=0; j<(segmentHeight - 1); j++) {
      geometry.indices.push(i*segmentWidth + j, i*segmentWidth + j + 1, (i + 1) * segmentWidth + j);

      geometry.indices.push((i + 1)*segmentWidth + j, i*segmentWidth + j + 1, (i + 1) * segmentWidth + j +1);
    }
  }

  return geometry;
}

module.exports = TerrianFbm;