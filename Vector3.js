class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    mult(n) {
        this.x *= n || 0;
        this.y *= n || 0;
        this.z *= n || 0;
    }
}

function logVector3(v) {
    console.log('(' + v.x + ', ' + v.y + ', ' + v.z + ')');
}