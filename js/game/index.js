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
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, kmToM(100000));
map.player.player = Player(camera);
const addEventListeners = () => {
  document.addEventListener("keydown", _keyDown);
  document.addEventListener("keyup", _keyUp);
}
const run = (gameContainer = document.getElementById('game-container')) => {
  let ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  let pointLight = new THREE.PointLight();
  scene.add(ambientLight);
  scene.add(pointLight);
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
  renderer.render(scene, camera);
}

export default run;
