import * as THREE from "three";
export default (ship = "ship", camera, canvas) => {
  const player = new THREE.Object3D();
  let cameraPan = new THREE.Group();
  let cameraWrapper = new THREE.Group();
  cameraPan.add(cameraWrapper)
  cameraWrapper.add(camera);
  camera.position.z = -10;
  camera.rotation.y = Math.PI;
  camera.position.y = 2;
  // player.add(cameraWrapper);
  player.add(cameraPan);
  let engines = new THREE.Group()
  player.engines = engines;
  engines.position.set(0,0,-5.00452)
  engines.scale.set(0.001,0.001,0.001)
  player.add(engines)
  player.add(new THREE.PointLight(0x404040,1,0,1))

  let loader = new THREE.JSONLoader();
  loader.load(`./models/${ship}.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  // loader.load(`./models/${ship}_engine1.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  loader.load(`./models/${ship}_engine2.json`, (geo, mat) => engines.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  //CameraControls
  this.enabled = false;
  let maxCameraY = 0.25;
  let maxCameraX = 0.5;
  document.addEventListener("pointerlockchange", e => (this.enabled = document.pointerLockElement === canvas));

  document.addEventListener("pointerlockerror", e => console.log("PointerLockError", e), false);
  document.addEventListener("click", e => canvas.requestPointerLock());
  document.addEventListener("mousemove", e => {
    if (this.enabled) {
      cameraPan.rotation.y= Math.min(maxCameraX,Math.max(-maxCameraX,cameraPan.rotation.y - e.movementX/1000))
      // cameraWrapper.rotation.y-=e.movementX/500
      cameraWrapper.rotation.x= Math.min(maxCameraY,Math.max(-maxCameraY,cameraWrapper.rotation.x - e.movementY/1000))
    } 
  });

  return player;
};
