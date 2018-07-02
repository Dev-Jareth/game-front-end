import * as THREE from 'three';
import { SCREEN } from '../util';
import PLAYER from '.';

let renderer;
const clock = new THREE.Clock();
export const setGUIRenderer = (givenRenderer) => { renderer = givenRenderer; };
export const playerGUI = {
	init: async () => {
		const loadFont = font => new Promise((resolve, reject) => {
			const loader = new THREE.FontLoader();
			loader.load(font, resolve, null, reject);
		});
		const font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
		SCREEN.updateResolution();
		playerGUI.scene = new THREE.Scene();
		playerGUI.camera = new THREE.OrthographicCamera(0, SCREEN.WIDTH, 0, SCREEN.HEIGHT, 0.1, 10 ** 3);
		playerGUI.lastRestrictedUpdate = 0;
		playerGUI.restrictedUpdateRate = 1 / 3;
		const entities = {};
		playerGUI.entities = entities;
		entities.axis = new THREE.Group();
		const temp = new THREE.AxisHelper(SCREEN.HEIGHT / 10);
		temp.rotation.x = Math.PI;
		entities.axis.add(temp);
		entities.velocity = new THREE.Mesh(new THREE.TextGeometry(0, {
			font,
			size: 60,
		}), new THREE.MeshBasicMaterial({
			color: 0xffffff,
		}));
		entities.velocity.rotation.x = Math.PI;
		entities.axis.userData.setPosition = () => playerGUI.entities.axis.position.set(SCREEN.WIDTH * 9 / 10 + SCREEN.HEIGHT / 20, SCREEN.HEIGHT * 8 / 10 + SCREEN.HEIGHT / 20, 0);
		entities.velocity.userData.setPosition = () => playerGUI.entities.velocity.position.set(SCREEN.WIDTH * 1 / 10, SCREEN.HEIGHT * 9 / 10, 0);
		entities.axis.userData.update = () => {
			playerGUI.entities.axis.rotation.copy(PLAYER.rotation);
		};
		entities.velocity.userData.update = () => {
			const { text } = playerGUI.entities.velocity.geometry.parameters;
			const { velocity } = PLAYER.userData.physics;
			if (text !== velocity) {
				playerGUI.entities.velocity.geometry = new THREE.TextGeometry(velocity, {
					font,
					size: 60,
				});
			}
		};
		playerGUI.scene.add(entities.axis);
		playerGUI.scene.add(entities.velocity);
		playerGUI.camera.position.z = SCREEN.HEIGHT / 5;

	},
	render: () => renderer.render(playerGUI.scene, playerGUI.camera),
	update: () => {

		playerGUI.entities.axis.userData.setPosition();
		playerGUI.entities.axis.userData.update();
		playerGUI.entities.velocity.userData.setPosition();
		// Restricted Updates
		if ((clock.getElapsedTime() - playerGUI.lastRestrictedUpdate) >= playerGUI.restrictedUpdateRate) {
			playerGUI.lastRestrictedUpdate = clock.getElapsedTime();
			playerGUI.entities.velocity.userData.update();
		}
		playerGUI.updateCamera();
		playerGUI.render();
	},
	updateCamera: () => {
		playerGUI.camera.left = 0;
		playerGUI.camera.right = SCREEN.WIDTH;
		playerGUI.camera.top = 0;
		playerGUI.camera.bottom = SCREEN.HEIGHT;
		playerGUI.camera.updateProjectionMatrix();
	},
};
