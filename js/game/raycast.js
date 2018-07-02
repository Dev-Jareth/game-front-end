import * as THREE from 'three';
import { getDisplayParent, SCREEN, print } from './util';
import { camera } from './player';
import { map } from './map';

const log = t => print(`||RayCaster|| ${t}`);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let target = null;

export const getTarget = () => target;

const setTarget = (t) => {
	target = t;
};
const resetTarget = () => {
	target = null;
};

const handleMouseTarget = (t) => {
	const obj = t ? getDisplayParent(t.object) : null;
	if (obj) {
		setTarget(obj);
		return log('Target found');
	}
	if (target) {
		resetTarget();
		return log('Removing Target');
	}
	return log('No Target');
};

export const listener = (event) => {
	mouse.x = (event.clientX / SCREEN.WIDTH) * 2 - 1;
	mouse.y = -(event.clientY / SCREEN.HEIGHT) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	handleMouseTarget(raycaster.intersectObjects(map.objects)[0]);
};
