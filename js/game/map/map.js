import { kmToM, print, printErr } from '../util';

const map = {
	x: {
		min: kmToM(-100000),
		max: kmToM(100000),
	},
	y: {
		min: kmToM(-100000),
		max: kmToM(100000),
	},
	z: {
		min: kmToM(-100000),
		max: kmToM(100000),
	},
	getDimensions: () => {
		return {
			x: map.x,
			y: map.y,
			z: map.z,
		};
	},
	objects: [],
};
export default map;
print('Map requested', map);
