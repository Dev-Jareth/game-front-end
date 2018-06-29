import * as THREE from 'three';

const defaultArgs = {
	position: {
		x: 0,
		y: 0,
		z: 0,
	},
	rotation: {
		x: 0,
		y: 0,
		z: 0,
	},
	asteroids: [],
};
const AsteroidBelt = (_args) => {
	const args = { ...defaultArgs, ..._args };
	const response = new THREE.Group();
	args.asteroids.forEach(asteroid => response.add(asteroid));
	const { x, y, z } = {
		...args.position,
	};
	response.position.set(x, y, z);
	return response;
};
export default AsteroidBelt;
