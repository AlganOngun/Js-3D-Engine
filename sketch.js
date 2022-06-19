let points = [];
let mesh;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var data = require('./Meshes/cube.json');
  mesh = getMeshFromJSON(data);
}

var angle = 0;
function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(255);
  strokeWeight(4);
  noFill();
  mesh.Render();
  angle += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawPoint(p, color, radius) {
  point(p.x, p.y);
  stroke(color);
  strokeWeight(radius);
}

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}