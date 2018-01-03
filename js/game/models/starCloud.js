import * as THREE from 'three';
const defaultArgs = { density: 1, coords: { x: { min: -1000, max: 1000 }, y: { min: -1000, max: 1000 }, z: { min: -1000, max: 1000 } } }
export const StarCloud = (args = defaultArgs) => {
    let density = args.density || 1;
    let { x, y, z } = { ...args.coords };
    // density *= Math.pow(10, -8);
    density /= Math.pow(1000,3);
    density *= Math.pow(calcStarCount(args.coords), -1);
    let points = Math.pow(calcStarCount(args.coords), 3) * density;
    console.log(points)
    let geometry = new THREE.Geometry();
    for (var i = 0; i < points; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = THREE.Math.randFloat(x.min, x.max);
        vertex.y = THREE.Math.randFloat(y.min, y.max);
        vertex.z = THREE.Math.randFloat(z.min, z.max);
        geometry.vertices.push(vertex);
    }
    let particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x888888 }));
    return particles
}

const calcStarCount = coords => typeof coords === "number" ? (coords.x + coords.y.coords.z) / 3 : (coords.x.max - coords.x.min + coords.y.max - coords.y.min + coords.z.max - coords.z.min) / 3
