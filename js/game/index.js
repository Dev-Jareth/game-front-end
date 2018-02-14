import * as THREE from "three";
import { Planet, StarCloud } from './models';
import player, { camera, calculatePlayerMove, keyboard, keyboardListeners, playerGUI, setGUIRenderer } from './player';
import { SCREEN_WIDTH, SCREEN_HEIGHT, kmToM, updateScreenResolution, print, printErr } from './util';
import * as Socket from './websocket/';
import { map, loadJsonToMap } from './map';
import jsonData from './fakeData.json';
/*######Debug######*/
// window.map = map;
/*#################*/
//Variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true
});
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
var currentMouseTarget;
renderer.autoClear = false;
map.player.player = player;
let mso = 0;
//Functions
const addEventListeners = () => {
  document.addEventListener("keydown", keyboardListeners._keyDown);
  document.addEventListener("keyup", keyboardListeners._keyUp);
  document.addEventListener("mousemove", event => {
    mouse.x = (event.clientX / SCREEN_WIDTH) * 2 - 1;
    mouse.y = -(event.clientY / SCREEN_HEIGHT) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    setMouseTarget(raycaster.intersectObjects(map.objects)[0])
  })
  window.addEventListener('resize', updateResolution);
}
const setMouseTarget = t => {
  if ((!t && !currentMouseTarget) || (t && currentMouseTarget && currentMouseTarget.object.uuid === t.object.uuid)) {
    print("No new target and no current target OR new target is already set")
    return; //Do nothing
  }
  if (!t && currentMouseTarget) {
    print("No new target.. resetting old target resetting old target material");
    currentMouseTarget.object.material = currentMouseTarget.object.userData.oldMaterial; //reset material
    currentMouseTarget = null; //reset
    return
  }
  if (t && currentMouseTarget) {
    print("New target is set... resetting old target material")
    currentMouseTarget.object.material = currentMouseTarget.object.userData.oldMaterial; //reset material
    currentMouseTarget = t; //set new object
    t.object.userData.oldMaterial = t.object.material; //store material for later
    return
  }
  if (t && !currentMouseTarget) {
    print("New target is set.. oldMaterial:")
    currentMouseTarget = t; //set new object
    t.object.userData.oldMaterial = t.object.material; //store material for later
    return
  }
  printErr("Oh No! setMouseTarget didn't seem to find it")

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
  if (currentMouseTarget) {
    currentMouseTarget.object.material = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: false
    })
  }
  //Move player
  calculatePlayerMove(delta || 0);
  //Update LOD objects to show correct detail
  map.objects.forEach(obj => obj instanceof THREE.LOD ? obj.update(camera) : void(0))
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
  scene.add(boundingBox);
  scene.add(StarCloud({
    density: 0.001,
    coords: {
      x: map.x,
      y: map.y,
      z: map.z
    }
  }))
}
const run = async token => {
  let gameContainer = document.getElementById('game-container')
  Socket.subscribe("Request-Authentication", () => Socket.sendMessage("Authentication", token))
  Socket.subscribe("Authenticated", () => console.log("Socket connection authenticated"))
  Socket.subscribe("Authentication-Refused", () => console.log("Socket refused authentication"))
  Socket.connect();
  init(gameContainer)
  // loadJsonToMap({
  //   player: user
  // });
  loadJsonToMap(jsonData);
  loadMap();
  addEventListeners();
  setGUIRenderer(renderer)
  playerGUI.init();
  animate();
}


export default run;