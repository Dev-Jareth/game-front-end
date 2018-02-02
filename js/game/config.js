import { kmToM } from './util';

export const planet = {
  lod: [
    {
      distanceFromCirc: kmToM(100000),
      detail: 6
    },
    {
      distanceFromCirc: kmToM(50000),
      detail: 12
    },
    {
      distanceFromCirc: kmToM(10000),
      detail: 24
    },
    {
      distanceFromCirc: kmToM(1000),
      detail: 60
    },
  ],
  classes: {
    M: {
      color: 0x00ff00
    },
    Z: {
      color: 0xaaaaaa
    }
  }
}
export default {
  planet
}
