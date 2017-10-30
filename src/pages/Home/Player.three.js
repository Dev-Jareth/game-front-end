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

  let loader = new THREE.JSONLoader();
  loader.load(`./models/${ship}.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  loader.load(`./models/${ship}_engine1.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  loader.load(`./models/${ship}_engine2.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat||new THREE.MeshStandardMaterial({color:0xffffff}))));
  let backLight = new THREE.SpotLight(0x404040,1);
  let lln = new THREE.PointLight(0x404040,6,3);
  let rln = new THREE.PointLight(0x404040,6,3);
  let llf = new THREE.PointLight(0x404040,6,3);
  let rlf = new THREE.PointLight(0x404040,6,3);
  // let hl1 = new THREE.Mesh(new THREE.SphereGeometry(0.1),new THREE.MeshBasicMaterial());
  lln.position.x = 1.49307;
  lln.position.z = -3.40264;
  lln.position.y = 0.15871;
  rln.position.x = -1.49307;
  rln.position.z = -3.40264;
  rln.position.y = 0.15871;
  rlf.position.x = -2.21757;
  rlf.position.z = -4.49979;
  rlf.position.y = 0.51649;
  llf.position.x = 2.21757;
  llf.position.z = -4.49979;
  llf.position.y = 0.51649;
  // let backLight = new THREE.SpotLight(0x404040,1,50);
  backLight.position.z = -10;
  backLight.position.y = 3;
  backLight.lookAt(new THREE.Vector3(0,0,0))
  player.add(lln);
  player.add(rln);
  player.add(llf);
  player.add(rlf);
  player.add(backLight);
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
