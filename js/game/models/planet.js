import * as THREE from 'three';
const defaultArgs = {
  radius: 10,
  position: {
    x: 0,
    y: 0,
    z: 0
  }
}


export const Planet = (args = defaultArgs) => {
  let response = new THREE.Mesh(
    new THREE.SphereGeometry(args.radius, Math.max(8, args.radius / 100000), Math.max(8, args.radius / 100000)),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true
    })
  )
  let {x, y, z} = {
    ...args.position || defaultArgs.position
  }
  response.position.set(x, y, z);
  return response;
}
