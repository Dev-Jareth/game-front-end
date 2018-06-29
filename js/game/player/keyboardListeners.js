import { keyboard } from '.';

export const onKeyDown = (e) => {
	const key = keyboard[e.key === ' ' ? 'space' : e.key.toLowerCase()];
	if (key) key.serverState = true; // ignore server
	// if (key) key.pressed = true;
};
export const onKeyUp = (e) => {
	const key = keyboard[e.key === ' ' ? 'space' : e.key.toLowerCase()];
	if (key) key.serverState = false;// ignore server
	// if (key) key.pressed = false;
};
export default {
	keyUpListener: onKeyUp,
	keyDownListener: onKeyDown,
};
