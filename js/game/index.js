import * as THREE from 'three';
import { StarCloud } from './models';
import PLAYER, { camera, calculatePlayerMove, keyboardListeners, playerGUI, setGUIRenderer } from './player';
import { SCREEN, kmToM, print, printErr } from './util';
import * as Socket from './websocket';
import * as config from './config';
import * as mouse from './raycast';
import { map, loadJsonToMap } from './map';
/* ######Debug###### */
// window.map = map;
/* ################# */
// Variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	logarithmicDepthBuffer: true,
});
renderer.autoClear = false;
map.player.player = PLAYER; // TODO: Depricate map.player.player
let mso = 0;
// Functions
const updateResolution = () => {
	SCREEN.updateResolution();
	renderer.setSize(SCREEN.WIDTH, SCREEN.HEIGHT);
	camera.aspect = SCREEN.WIDTH / SCREEN.HEIGHT;
	camera.updateProjectionMatrix();
};
const addEventListeners = () => {
	window.addEventListener('keydown', keyboardListeners.keyDownListener);
	window.addEventListener('keyup', keyboardListeners.keyUpListener);
	window.addEventListener('mousemove', mouse.listener);
	window.addEventListener('resize', updateResolution);
};
const addObjToScene = (obj) => {
	if (!scene.getObjectById(obj.uuid)) scene.add(obj);
};
const loadMap = () => {
	map.objects.forEach(addObjToScene);
	scene.add(PLAYER);
};
const animate = (ms) => {
	const delta = (ms - mso) / 1000;
	mso = ms;
	if (mouse.getTarget()) {
		mouse.getTarget().object.material = new THREE.MeshBasicMaterial({
			color: 0xff00ff,
			wireframe: false,
		});
	}
	// Move player
	calculatePlayerMove(delta || 0);
	// Update LOD objects to show correct detail
	map.objects.forEach(obj => (obj instanceof THREE.LOD ? obj.update(camera) : undefined));
	// Draw & Re-call//
	window.requestAnimationFrame(animate);
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	playerGUI.update(ms);
};
const init = (gameContainer) => {
	updateResolution();
	gameContainer.classList.remove('hidden');
	gameContainer.appendChild(renderer.domElement);
	const boundingBox = new THREE.Mesh(new THREE.BoxGeometry(map.x.max - map.x.min, map.y.max - map.y.min, map.z.max - map.z.min, 10, 10, 10), new THREE.MeshBasicMaterial({
		wireframe: true,
		color: 0x002e78,
	}));
	boundingBox.add(new THREE.Mesh(new THREE.BoxGeometry(map.x.max - map.x.min, map.y.max - map.y.min, map.z.max - map.z.min), new THREE.MeshBasicMaterial({
		side: THREE.BackSide,
		wireframe: false,
		color: 0x002e78,
		transparent: true,
		opacity: 0.3,
	})));
	scene.add(new THREE.AmbientLight(0x404040, 0.5));
	scene.add(new THREE.PointLight());
	// scene.add(boundingBox);
	scene.add(StarCloud({
		density: 0.001,
		coords: {
			x: map.x,
			y: map.y,
			z: map.z,
		},
	}));
};
const loadToMap = (data) => {
	loadJsonToMap(data);
	loadMap();
};
const run = async (token) => {
	const gameContainer = document.getElementById('game-container');
	PLAYER.userData.authenticationKey = token;
	await Socket.getMessageTypes();
	const msg = config.socket.messages;
	Socket.subscribe(msg.server.requestAuth, () => Socket.sendMessage(msg.client.sendAuth, token));
	Socket.subscribe(msg.server.acceptAuth, () => Socket.sendMessage(msg.client.requestPlayerData));
	Socket.subscribe(msg.server.refuseAuth, () => printErr('Socket refused authentication'));
	Socket.subscribe(msg.server.sendPlayerData, player => loadJsonToMap({ player }));
	Socket.subscribe(msg.server.sendMap, loadToMap);
	await Socket.connect();
	Socket.sendMessage(msg.client.requestMap);

	init(gameContainer);
	// loadJsonToMap({
	//   player: user
	// });
	// loadJsonToMap(jsonData);
	// loadMap();
	addEventListeners();
	setGUIRenderer(renderer);
	playerGUI.init();
	animate();
};


export default run;
