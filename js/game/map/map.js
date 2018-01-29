import { kmToM } from '../util';
export const map = {
  x: {
    min: kmToM(-100000),
    max: kmToM(100000)
  },
  y: {
    min: kmToM(-100000),
    max: kmToM(100000)
  },
  z: {
    min: kmToM(-100000),
    max: kmToM(100000)
  },
  getDimensions: () => ({
    x: map.x,
    y: map.y,
    z: map.z
  }),
  player: {
    player: null,
    coords: {
      get x() {
        return map.player.player.position.x
      },
      set x(x) {
        map.player.player.position.x = x
      },
      get y() {
        return map.player.player.position.y
      },
      set y(y) {
        map.player.player.position.y = y
      },
      get z() {
        return map.player.player.position.z
      },
      set z(z) {
        map.player.player.position.z = z
      },
      set: vector => {
        if (map.player.player) {
          map.player.player.position.x = vector.x;
          map.player.player.position.y = vector.y;
          map.player.player.position.z = vector.z;
        } else {
          console.error("Attempted to set player coords but player was null")
        }
      }
    },
    rotation: {
      x: () => map.player.player.rotation.x,
      y: () => map.player.player.rotation.y,
      z: () => map.player.player.rotation.z,
      set: vector => {
        if (map.player.player) {
          map.player.player.rotation.x = vector.x;
          map.player.player.rotation.y = vector.y;
          map.player.player.rotation.z = vector.z;
        } else {
          console.error("Attempted to set player rotation but player was null")
        }
      }
    },
  },
  objects: []
}
console.log("Map requested", map)
