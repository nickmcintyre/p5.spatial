function setup() {
  createCanvas(900, 500);

  // Free Tile Providers
  // 'OpenStreetMap.Mapnik'
  // 'Stamen.Terrain'
  // 'Stamen.TerrainBackground'
  // 'Stamen.Toner' (default)
  // 'Stamen.TonerBackground'
  // 'Stamen.TonerLite'
  // 'Stamen.Watercolor'

  beginMap();
  center(-94.789, 29.301);
  zoom(9);
  // provider('Stamen.Watercolor');
  endMap();
}

function draw() {
  beginMap();
  fill('darkorchid');
  stroke('deeppink');
  strokeWeight(3);
  const d = 5 * sin(frameCount * 0.05) + 15;
  circle(-94.789, 29.301, d);
  endMap();
  noStroke();
  fill(255, 100);
  circle(mouseX, mouseY, 50);
}
