import * as THREE from 'three';

const defaultArgs = {
	radius: 1000,
	position: {
		x: 0,
		y: 0,
		z: 0,
	},
};
const Asteroid = (args) => {
	const response = new THREE.Mesh(
		new THREE.SphereGeometry(args.radius, Math.max(8, args.radius / 100000), Math.max(8, args.radius / 100000)),
		new THREE.MeshPhongMaterial({
			color: 0xaaacca,
			wireframe: true,
			transparent: true,
		})
	);
	const { x, y, z } = {
		...args.position || defaultArgs.position,
	};
	response.position.set(x, y, z);
	return response;
};
export default Asteroid;
