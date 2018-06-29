import { kmToM } from './util';
import { host } from '../config';

export const baseSocketUrl = `ws://${host}/socket`;
export const settings = {
	debugMode: false,
};
export const socket = {
	setMessages: (obj) => { socket.messages = obj; },
};
export const planet = {
	lod: [{
		distanceFromCirc: kmToM(100000),
		detail: 1,
	},
	{
		distanceFromCirc: kmToM(50000),
		detail: 2,
	},
	{
		distanceFromCirc: kmToM(10000),
		detail: 4,
	},
	{
		distanceFromCirc: kmToM(1000),
		detail: 10,
	},
	],
	categories: {
		M: {
			color: 0x00ff00,
		},
		Z: {
			color: 0xaaaaaa,
		},
	},
};
export default {
	planet,
	settings,
};
