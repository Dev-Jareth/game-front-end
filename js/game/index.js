import * as THREE from "three";
import { Planet, StarCloud } from './models';
import Player, { camera, calculatePlayerMove, keyboard, keyboardListeners } from './player';
import { SCREEN_WIDTH, SCREEN_HEIGHT, kmToM, updateScreenResolution } from './util';
import { map, loadJsonToMap } from './map';
/*######Debug######*/
window.map = map;
/*#################*/
import jsonData from './fakeData.json';
const {_keyUp, _keyDown} = {
  ...keyboardListeners
};
const updateResolution = () => {
  updateScreenResolution()
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.autoClear = false;
const scene = new THREE.Scene();
map.player.player = Player();
const addEventListeners = () => {
  document.addEventListener("keydown", _keyDown);
  document.addEventListener("keyup", _keyUp);
}
const run = async (gameContainer = document.getElementById('game-container')) => {
  gameContainer.classList.remove("hidden");
  await playerGUI.init(document.getElementById('player-gui'));
  let ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  let pointLight = new THREE.PointLight();
  let boundingBox = new THREE.Mesh(new THREE.BoxGeometry(map.x.max - map.x.min, map.y.max - map.y.min, map.z.max - map.z.min, 10, 10, 10), new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x002e78
  }))
  boundingBox.add(new THREE.Mesh(new THREE.BoxGeometry(map.x.max - map.x.min, map.y.max - map.y.min, map.z.max - map.z.min), new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    wireframe: false,
    color: 0x002e78,
    transparent: true,
    opacity: 0.3
  })))
  scene.add(ambientLight);
  scene.add(pointLight);
  scene.add(boundingBox);
  scene.add(StarCloud({
    density: 0.001,
    coords: {
      x: map.x,
      y: map.y,
      z: map.z
    }
  }))
  gameContainer.appendChild(renderer.domElement);

  loadJsonToMap(jsonData);
  loadMap();
  animate();
  addEventListeners();
}
const loadMap = () => {
  map.objects.forEach(addObjToScene)
  scene.add(map.player.player);
}
const addObjToScene = obj => {
  if (!scene.getObjectById(obj.name)) scene.add(obj);
}
const animate = () => {
  calculatePlayerMove({
    player: map.player.player
  });

  map.objects.forEach(obj => obj instanceof THREE.LOD ? obj.update(camera) : void (0))
  map.objects[0].rotation.y += 0.001;
  //Draw & Re-call//
  updateResolution()
  requestAnimationFrame(animate);
  renderer.clear()
  renderer.render(scene, camera);
  renderer.clearDepth()
  playerGUI.update()
}

const playerGUI = {
  init: async parent => {
    let loadFont = font => new Promise((resolve, reject) => {
      let loader = new THREE.FontLoader();
      loader.load(font, resolve, null, reject)
    })
    let font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
    updateScreenResolution()
    playerGUI.scene = new THREE.Scene();
    playerGUI.camera = new THREE.OrthographicCamera(0, SCREEN_WIDTH, 0, SCREEN_HEIGHT, 0.1, 10000000);
    let entities = {};
    playerGUI.entities = entities;
    entities.axis = new THREE.AxisHelper(SCREEN_HEIGHT / 10);
    entities.velocity = new THREE.Mesh(new THREE.TextGeometry(0, {
      font,
      size: 60
    }), new THREE.MeshBasicMaterial({
      color: 0xffffff
    }));
    entities.velocity.rotation.x = Math.PI;
    entities.axis.userData.setPosition = () => playerGUI.entities.axis.position.set(SCREEN_WIDTH * 9 / 10 + SCREEN_HEIGHT / 20, SCREEN_HEIGHT * 8 / 10 + SCREEN_HEIGHT / 20, 0);
    entities.velocity.userData.setPosition = () => playerGUI.entities.velocity.position.set(SCREEN_WIDTH * 1 / 10, SCREEN_HEIGHT * 9 / 10, 0);
    entities.velocity.userData.update = () => playerGUI.entities.velocity.geometry.parameters.text != map.player.player.userData.physics.velocity ? playerGUI.entities.velocity.geometry = new THREE.TextGeometry(map.player.player.userData.physics.velocity, {
      font,
      size: 60
    }) : void (0)
    playerGUI.scene.add(entities.axis);
    playerGUI.scene.add(entities.velocity);
    playerGUI.camera.position.z = SCREEN_HEIGHT / 5;

  },
  __render: () => renderer.render(playerGUI.scene, playerGUI.camera),
  update: () => {
    playerGUI.entities.axis.rotation.x += 0.01;
    playerGUI.entities.axis.rotation.y += 0.01;
    playerGUI.entities.axis.userData.setPosition();
    playerGUI.entities.velocity.userData.setPosition();
    playerGUI.entities.velocity.userData.update();
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

export default run;
