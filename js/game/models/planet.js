import * as THREE from 'three';
import { planet as config } from '../config';
import { assign } from '../util';

const defaultArgs = {
	radius: 10000,
	position: {
		x: 0,
		y: 0,
		z: 0,
	},
	category: 'Z',
};

const calcDetail = (radius, detail) => Math.round(radius * (10 ** -6)) * detail;

const generateMesh = (radius, complexity, color) => new THREE.Mesh(
	new THREE.SphereGeometry(radius, Math.max(8, complexity), Math.max(8, complexity)),
	new THREE.MeshPhongMaterial({ color, wireframe: true, transparent: true })
);

const Planet = (_args) => {
	const args = {};
	assign(args, defaultArgs, _args);
	const pclass = config.categories[args.category];
	const response = new THREE.LOD();
	response.name = args.name;
	// generateMesh(args.radius, 60, pclass.color)
	const { radius } = args;
	const lvlMesh = dtl => generateMesh(radius, calcDetail(radius, dtl), pclass.color);
	config.lod.map(lod => response.addLevel(lvlMesh(lod.detail), radius + lod.distanceFromCirc));
	const { x, y, z } = {
		...args.position,
	};
	response.position.set(x, y, z);
	// response.updateMatrix();
	return response;
};
export default Planet;
