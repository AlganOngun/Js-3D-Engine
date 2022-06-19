class Matrix {
    constructor(m) {
        this.m = m;
    }
}

function logMatrix(matrix) {
    for (var i = 0; i < matrix.m.length; i++) {
        for (var j = 0; j < matrix.m[0].length; j++) {
            console.log(matrix.m[i][j]);
        }
    }
}

function vecToMatrix(v) {
    var m = [
        [v.x],
        [v.y],
        [v.z]
    ];
    return new Matrix(m);
}

function matrixToVector(m) {
    var v = new Vector3(0, 0, 0);
    v.x = m.m[0][0];
    v.y = m.m[1][0];
    if (m.m.length > 2) {
        v.z = m.m[2][0];
    }
    return new Vector3(v.x, v.y, v.z);
}

function matrixMultiply(a, b) {
    var colsA = a.m[0].length;
    var rowsA = a.m.length;
    var colsB = b.m[0].length;
    var rowsB = b.m.length;

    if (colsA != rowsB) {
        return null;
    }

    var result = createArray(rowsA, colsB);

    for (var i = 0; i < rowsA; i++) {
        for (var j = 0; j < colsB; j++) {
            var sum = 0;
            for (var k = 0; k < colsA; k++) {
                sum += a.m[i][k] * b.m[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result);
}

function matrixMultiplyV(a, v) {
    var m = vecToMatrix(v);
    return matrixMultiply(a, m);
}