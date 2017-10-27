import * as THREE from "three";
export default (ship = "ship", camera) => {
  const player = new THREE.Object3D();
  let cameraWrapper = new THREE.Group();
  cameraWrapper.add(camera);

  player.add(cameraWrapper);
  let loader = new THREE.JSONLoader();
  loader.load(`./models/${ship}.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat)));
  let maxCameraY = 0.25;
  let maxCameraX = 1;
  document.addEventListener("mousemove", e => {
    let distanceX = 100 * e.x / window.innerWidth;
    let distanceY = 100 * e.y / window.innerHeight;
    // console.log( 2*Math.PI*(50-distanceX)/100)
    cameraWrapper.rotation.y = maxCameraX * 2 * Math.PI * (50 - distanceX) / 100;
    cameraWrapper.rotation.x = maxCameraY * 2 * Math.PI * (50 - distanceY) / 100;
  });

  camera.position.z = -10;
  camera.rotation.y = Math.PI;
  camera.position.y = 2;
  return player;
}; 
