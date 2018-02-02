import * as THREE from 'three';
import config from '../config';
const defaultArgs = {
  radius: 10000,
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  class: "Z"
}
const planetClass = {
  M: {
    color: 0x00ff00
  },
  Z: {
    color: 0xaaaaaa
  }
}

export const Planet = (args = defaultArgs) => {
  let pclass = planetClass[args.class || defaultArgs.class]
  let response = new THREE.LOD();
  //generateMesh(args.radius, 60, pclass.color)
  config.planet.lod.map(lod => response.addLevel(generateMesh(args.radius, lod.detail, pclass.color), args.radius + lod.distanceFromCirc))
  let {x, y, z} = {
    ...args.position || defaultArgs.position
  }
  response.position.set(x, y, z);
  // response.updateMatrix();
  return response;
}

const generateMesh = (radius, complexity, color) => new THREE.Mesh(
  new THREE.SphereGeometry(radius, Math.max(8, complexity), Math.max(8, complexity)),
  new THREE.MeshPhongMaterial({
    color,
    wireframe: true,
    transparent: true
  })
)
