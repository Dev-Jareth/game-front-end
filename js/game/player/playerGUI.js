import * as THREE from 'three';
import { updateScreenResolution, SCREEN_WIDTH, SCREEN_HEIGHT } from '../util';
import { map } from '../map';
let renderer
export const setGUIRenderer = givenRenderer => renderer = givenRenderer;
export const playerGUI = {
  init: async parent => {
    let loadFont = font => new Promise((resolve, reject) => {
      let loader = new THREE.FontLoader();
      loader.load(font, resolve, null, reject)
    })
    let font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
    updateScreenResolution()
    playerGUI.scene = new THREE.Scene();
    playerGUI.camera = new THREE.OrthographicCamera(0, SCREEN_WIDTH, 0, SCREEN_HEIGHT, 0.1, 10000000);
    playerGUI.lastRestrictedUpdate = 0;
    playerGUI.restrictedUpdateRate = 1 / 3;
    let entities = {};
    playerGUI.entities = entities;
    entities.axis = new THREE.Group()
    let temp = new THREE.AxisHelper(SCREEN_HEIGHT / 10);
    temp.rotation.x = Math.PI;
    entities.axis.add(temp);
    entities.velocity = new THREE.Mesh(new THREE.TextGeometry(0, {
      font,
      size: 60
    }), new THREE.MeshBasicMaterial({
      color: 0xffffff
    }));
    entities.velocity.rotation.x = Math.PI;
    entities.axis.userData.setPosition = () => playerGUI.entities.axis.position.set(SCREEN_WIDTH * 9 / 10 + SCREEN_HEIGHT / 20, SCREEN_HEIGHT * 8 / 10 + SCREEN_HEIGHT / 20, 0);
    entities.velocity.userData.setPosition = () => playerGUI.entities.velocity.position.set(SCREEN_WIDTH * 1 / 10, SCREEN_HEIGHT * 9 / 10, 0);
    entities.axis.userData.update = () => {
      playerGUI.entities.axis.rotation.copy(map.player.player.rotation);
    }
    entities.velocity.userData.update = () => playerGUI.entities.velocity.geometry.parameters.text == map.player.player.userData.physics.velocity ? void (0) : playerGUI.entities.velocity.geometry = new THREE.TextGeometry(map.player.player.userData.physics.velocity, {
      font,
      size: 60
    })
    playerGUI.scene.add(entities.axis);
    playerGUI.scene.add(entities.velocity);
    playerGUI.camera.position.z = SCREEN_HEIGHT / 5;

  },
  __render: () => renderer.render(playerGUI.scene, playerGUI.camera),
  update: ms => {

    playerGUI.entities.axis.userData.setPosition();
    playerGUI.entities.axis.userData.update();
    playerGUI.entities.velocity.userData.setPosition();
    //Restricted Updates
    if ((ms - playerGUI.lastRestrictedUpdate) / 1000 >= playerGUI.restrictedUpdateRate) {
      playerGUI.lastRestrictedUpdate = ms;
      playerGUI.entities.velocity.userData.update();
    }
    playerGUI.__updateCamera()
    playerGUI.__render()
  },
  __updateCamera: () => {
    playerGUI.camera.left = 0
    playerGUI.camera.right = SCREEN_WIDTH
    playerGUI.camera.top = 0
    playerGUI.camera.bottom = SCREEN_HEIGHT
    playerGUI.camera.updateProjectionMatrix();
  }
}
