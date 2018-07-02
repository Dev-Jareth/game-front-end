import { Clock } from 'three';
import { keyboard } from '.';
import PLAYER from './Player';

const clock = new Clock();
const calculatePlayerMovement = () => {
	const delta = clock.getDelta();
	PLAYER.userData.physics = PLAYER.userData.physics || {};
	const playerPhysics = PLAYER.userData.physics;
	// requestPlayerMove();
	const { w, a, s, d, q, e, space, shift } = {
		...keyboard,
	};
	const tempModifier = 50;
	const damperStrength = 2 / 100;
	const engineStrength = 50000 * tempModifier / 100;
	const maxSpeed = 50000 * tempModifier;
	const maxReverse = 2 * tempModifier;
	const maxManouver = 2;

	// W
	w.rate = w.serverState
		? Math.min(maxSpeed, w.rate + engineStrength) : Math.max(0, w.rate - engineStrength);
	PLAYER.translateZ(w.rate * delta);
	// S
	s.rate = s.serverState
		? Math.min(maxReverse, s.rate + damperStrength) : Math.max(0, s.rate - damperStrength);
	PLAYER.translateZ(-s.rate * delta);
	// A
	a.rate = a.serverState
		? Math.min(maxManouver, a.rate + damperStrength) : Math.max(0, a.rate - damperStrength);
	PLAYER.rotateZ(a.rate * -1 * delta);
	// D
	d.rate = d.serverState
		? Math.min(maxManouver, d.rate + damperStrength) : Math.max(0, d.rate - damperStrength);
	PLAYER.rotateZ(d.rate * 1 * delta);
	// Q
	q.rate = q.serverState
		? Math.min(maxManouver, q.rate + damperStrength) : Math.max(0, q.rate - damperStrength);
	PLAYER.rotateY(q.rate * 0.8 * delta);
	// E
	e.rate = e.serverState
		? Math.min(maxManouver, e.rate + damperStrength) : Math.max(0, e.rate - damperStrength);
	PLAYER.rotateY(e.rate * -0.8 * delta);
	// SPACE
	space.rate = space.serverState
		? Math.min(maxManouver, space.rate + damperStrength) : Math.max(0, space.rate - damperStrength);
	PLAYER.rotateX(space.rate * -1 * delta);
	// SHIFT
	shift.rate = shift.serverState
		? Math.min(maxManouver, shift.rate + damperStrength) : Math.max(0, shift.rate - damperStrength);
	PLAYER.rotateX(shift.rate * 1 * delta);

	// SET physics
	playerPhysics.rotation = playerPhysics.rotation || {};
	playerPhysics.velocity = w.rate - s.rate;
	playerPhysics.rotation.x = space.rate - shift.rate;
	playerPhysics.rotation.y = q.rate - e.rate;
	playerPhysics.rotation.z = a.rate - d.rate;
};

// PLAYER.onBeforeRender = calculatePlayerMovement;
PLAYER.updateMatrixWorld = (force) => {
	calculatePlayerMovement();
	PLAYER.constructor.prototype.updateMatrixWorld.call(PLAYER, force);
};

export default calculatePlayerMovement;
