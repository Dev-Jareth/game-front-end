import * as THREE from "three";
import { Planet, StarCloud } from './models';
import player, { camera, calculatePlayerMove, keyboard, keyboardListeners, playerGUI, setGUIRenderer } from './player';
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
setGUIRenderer(renderer)
const scene = new THREE.Scene();
map.player.player = player;
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
  if (!scene.getObjectById(obj.uuid)) scene.add(obj);
}
let mso = 0;
const animate = ms => {
  let delta = (ms - mso) / 1000
  mso = ms;
  calculatePlayerMove(delta || 0);

  map.objects.forEach(obj => obj instanceof THREE.LOD ? obj.update(camera) : void (0))
  map.objects[0].rotation.y += 0.001;
  //Draw & Re-call//
  updateResolution()
  requestAnimationFrame(animate);
  renderer.clear()
  renderer.render(scene, camera);
  renderer.clearDepth()
  playerGUI.update(ms)
}


export default run;
