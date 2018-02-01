import * as THREE from 'three';
const defaultArgs = {
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  asteroids: []
}
export const AsteroidBelt = args => {
  args = {
    ...defaultArgs, ...args
  };
  console.log(args)
  let response = new THREE.Group();
  let {x, y, z} = {
    ...args.position
  };
  response.position.set(x, y, z);
  return response;
}
