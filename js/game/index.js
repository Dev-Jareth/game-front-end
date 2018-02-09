import * as THREE from "three";
import { Planet, StarCloud } from './models';
import player, { camera, calculatePlayerMove, keyboard, keyboardListeners, playerGUI, setGUIRenderer } from './player';
import { SCREEN_WIDTH, SCREEN_HEIGHT, kmToM, updateScreenResolution } from './util';
import { map, loadJsonToMap } from './map';
import jsonData from './fakeData.json';
/*######Debug######*/
// window.map = map;
/*#################*/
//Variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.autoClear = false;
map.player.player = player;
let mso = 0;
//Functions
const addEventListeners = () => {
  document.addEventListener("keydown", keyboardListeners._keyDown);
  document.addEventListener("keyup", keyboardListeners._keyUp);
  window.addEventListener('resize', updateResolution);
}
const updateResolution = () => {
  updateScreenResolution()
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}
const loadMap = () => {
  map.objects.forEach(addObjToScene)
  scene.add(map.player.player);
}
const addObjToScene = obj => {
  if (!scene.getObjectById(obj.uuid)) scene.add(obj);
}
const animate = ms => {
  let delta = (ms - mso) / 1000
  mso = ms;
  //Move player
  calculatePlayerMove(delta || 0);
  //Update LOD objects to show correct detail
  map.objects.forEach(obj => obj instanceof THREE.LOD ? obj.update(camera) : void (0))
  //Draw & Re-call//
  requestAnimationFrame(animate);
  renderer.clear()
  renderer.render(scene, camera);
  renderer.clearDepth()
  playerGUI.update(ms)
}
const init = gameContainer => {
  updateResolution()
  gameContainer.classList.remove("hidden");
  gameContainer.appendChild(renderer.domElement);
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
  scene.add(new THREE.AmbientLight(0x404040, 0.5));
  scene.add(new THREE.PointLight());
  scene.add(boundingBox);scene.add(StarCloud({
    density: 0.001,
    coords: {
      x: map.x,
      y: map.y,
      z: map.z
    }
  }))
}
const run = async (gameContainer = document.getElementById('game-container')) => {
  init(gameContainer)
  loadJsonToMap(jsonData);
  loadMap();
  addEventListeners();
  setGUIRenderer(renderer)
  playerGUI.init();
  animate();
}


export default run;
