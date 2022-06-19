class Mesh {
  constructor(triangles) {
    this.triangles = triangles;
  }
  Render() {
    var rotationZ = [
      [cos(angle), -sin(angle), 0],
      [sin(angle), cos(angle), 0],
      [0, 0, 1]
    ];
    var rotationX = [
      [1, 0, 0],
      [0, cos(angle), -sin(angle)],
      [0, sin(angle), cos(angle)]
    ];
    var rotationY = [
      [cos(angle), 0, -sin(angle)],
      [0, 1, 0],
      [sin(angle), 0, cos(angle)]
    ];
    var rotationMatrixZ = new Matrix(rotationZ);
    var rotationMatrixX = new Matrix(rotationX);
    var rotationMatrixY = new Matrix(rotationY);
    var projectedTriangles = [];
    for (var i = 0; i < this.triangles.length; i++) {
      var trianglePoints = this.triangles[i].getArray();
      var projectedPoints = [3];
      for (var j = 0; j < trianglePoints.length; j++) {
        var rotated = matrixToVector(matrixMultiplyV(rotationMatrixY, trianglePoints[j]));
        rotated = matrixToVector(matrixMultiplyV(rotationMatrixX, rotated));
        rotated = matrixToVector(matrixMultiplyV(rotationMatrixZ, rotated));

        var distance = 2;
        var z = 1 / (distance - rotated.z);
        var projection = [
          [z, 0, 0],
          [0, z, 0]
        ];
        var projectionMatrix = new Matrix(projection);

        var projectedPoint = matrixToVector(matrixMultiplyV(projectionMatrix, rotated));
        projectedPoint.mult(250);
        projectedPoints[j] = projectedPoint;
        point(projectedPoint.x, projectedPoint.y);
      }
      projectedTriangles[i] = new Triangle(projectedPoints[0], projectedPoints[1], projectedPoints[2]);
    }

    for (var i = 0; i < projectedTriangles.length; i++) {
      drawTriangle(projectedTriangles[i].getArray());
    }

  }
}

function drawTriangle(points) {
  stroke(255);
  strokeWeight(1);
  line(points[0].x, points[0].y, points[1].x, points[1].y);
  line(points[1].x, points[1].y, points[2].x, points[2].y);
  line(points[0].x, points[0].y, points[2].x, points[2].y);
}

function getMeshFromJSON(data) {
  var triangles = [];
  for (var i = 0; i < data.triangles.length; i++) {
    var triangle = data.triangles[i];
    var p1 = new Vector3(triangle.p1[0], triangle.p1[1], triangle.p1[2]);
    var p2 = new Vector3(triangle.p2[0], triangle.p2[1], triangle.p2[2]);
    var p3 = new Vector3(triangle.p3[0], triangle.p3[1], triangle.p3[2]);
    triangles[i] = new Triangle(p1, p2, p3);
  }
  return new Mesh(triangles);
}

function getMeshFromObj(path) {
  debugger;
  var obj = getObj(path);
  var verticeStrings = obj.match(/^v .*/g);
  var points = [];
  var triangles = [];
  for(var i = 0; i < verticeStrings.length; i++){
    var vertexString = verticeStrings[i];
    vertexString = vertexString.replace('v ','');
    var vertex = vertexString.split(' ');
    var point = new Vector3(vertex[0],vertex[2],vertex[1]);
    points.push(point);
  }
  var triangleStrings = obj.match(/^f .*/gm);
  for(var i = 0; i < obj.triangleStrings.length;i++){
    var triangleString = triangleStrings[i];
    triangleString = triangleString.replace('f ','');
    var splitted = triangleString.split(' ');
    for(var j = 0; j < splitted.length;j++){
      var split = splitted[j];
      var nonSlashed = split.replaceAll('/',''); // 123
      var triangle = new Triangle(points[nonSlashed[0]-1],points[nonSlashed[1]-1],points[nonSlashed[2]-1]);
      triangles.push(triangle);
    }
  }
  return new Mesh(triangles);
}

function threebythree(){

}

function getObj(path) {
  var fs = require("fs");
  try {
    var data = fs.readFileSync(path, 'utf-8');
    return data;
  } catch (e) {
    console.log(e);
  }
}

function createFile(path,data){
  var fs = require("fs");
  var json = fs.writeFileSync(path,data);
  return json;
}