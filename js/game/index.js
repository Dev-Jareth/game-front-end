import * as THREE from "three";
import { Planet, StarCloud } from './models';
import Player, { calculatePlayerMove, keyboard, keyboardListeners } from './player';
import { kmToM } from './util';
import { map, loadJsonToMap } from './map';
/*######Debug######*/
window.map = map;
/*#################*/
import jsonData from './fakeData.json';
const {_keyUp, _keyDown} = {
  ...keyboardListeners
};
var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;
const updateScreenResolution = () => {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.autoClear = false;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, kmToM(100000));
map.player.player = Player(camera);
const addEventListeners = () => {
  document.addEventListener("keydown", _keyDown);
  document.addEventListener("keyup", _keyUp);
}
const run = (gameContainer = document.getElementById('game-container')) => {
  gameContainer.classList.remove("hidden");
  playerGUI.init(document.getElementById('player-gui'));
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
  updateScreenResolution()
  requestAnimationFrame(animate);
  renderer.clear()
  renderer.render(scene, camera);
  renderer.clearDepth()
  playerGUI.update()
}

const playerGUI = {
  init: parent => {
    updateScreenResolution()
    playerGUI.scene = new THREE.Scene();
    playerGUI.camera = new THREE.OrthographicCamera(0, SCREEN_WIDTH, 0, SCREEN_HEIGHT, 0.1, 10000000);
    let entities = {};
    playerGUI.entities = entities;
    entities.axis = new THREE.AxisHelper(SCREEN_HEIGHT / 10);
    entities.axis.userData.setPosition = () => playerGUI.entities.axis.position.set(SCREEN_WIDTH * 9 / 10 + SCREEN_HEIGHT / 20, SCREEN_HEIGHT * 8 / 10 + SCREEN_HEIGHT / 20, 0);
    playerGUI.scene.add(entities.axis);
    let loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
      entities.velocity = new THREE.TextGeometry("Velocity Here", font);playerGUI.scene.add(entities.velocity);
    });



    playerGUI.camera.position.z = SCREEN_HEIGHT / 5;

  },
  __render: () => renderer.render(playerGUI.scene, playerGUI.camera),
  update: () => {
    playerGUI.entities.axis.rotation.x += 0.01;
    playerGUI.entities.axis.rotation.y += 0.01;
    playerGUI.entities.axis.userData.setPosition();
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
//velocity => map.player.player.userData.physics.velocity
const addAxis = () => {

}

export default run;
