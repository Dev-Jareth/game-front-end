import * as THREE from 'three';
import { SCREEN, print, printErr } from './util';
import { camera } from './player';
import { map } from './map';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let target;

export const getTarget = () => target;

const setNewTarget = (t) => {
	// t.object.userData.oldMaterial = t.object.material; // store material for later
	target = t;
	target.object.userData.oldMaterial = t.object.material; // store material for later
};
const resetOldTarget = () => {
	target.object.material = target.object.userData.oldMaterial; // reset material
	target = null;
};

const handleMouseTarget = (t) => {
	if ((!t && !target) || (t && target && target.object.uuid === t.object.uuid)) {
		return print('No new target and no current target OR new target is already set');
	}
	if (!t && target) {
		resetOldTarget();
		return print('No new target.. cleared old target, reset old target material');
	}
	if (t && target) {
		resetOldTarget();
		setNewTarget(t);
		return print('New target is set... reset old target');
	}
	if (t && !target) {
		setNewTarget(t);
		return print('New target is set..');
	}
	return printErr("Oh No! setMouseTarget didn't seem to find it");
};

export const listener = (event) => {
	mouse.x = (event.clientX / SCREEN.WIDTH) * 2 - 1;
	mouse.y = -(event.clientY / SCREEN.HEIGHT) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	handleMouseTarget(raycaster.intersectObjects(map.objects)[0]);
};
