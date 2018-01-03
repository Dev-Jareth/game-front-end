import * as THREE from 'three';
const defaultArgs = { radius: 10 }


export const Planet = (args = defaultArgs) => {
    return new THREE.Mesh(new THREE.SphereGeometry(args.radius,Math.max(8,args.radius/100000),Math.max(8,args.radius/100000)), new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true }))
}