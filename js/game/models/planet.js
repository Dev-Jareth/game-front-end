import * as THREE from 'three';
import { planet as config } from '../config';
const defaultArgs = {
  radius: 10000,
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  class: "Z"
}

export const Planet = (args) => {
  args = {
    ...defaultArgs, ...args
  }
  let pclass = config.classes[args.class]
  let response = new THREE.LOD();
  //generateMesh(args.radius, 60, pclass.color)
  config.lod.map(lod => response.addLevel(generateMesh(args.radius, lod.detail, pclass.color), args.radius + lod.distanceFromCirc))
  let {x, y, z} = {
    ...args.position
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
