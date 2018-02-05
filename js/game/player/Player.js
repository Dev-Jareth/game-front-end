import * as THREE from 'three';
const loader = new THREE.ObjectLoader();

export const Player = camera => {
  var player = new THREE.Group();
  player.name = "Player"
  //model from clara.io (<3 <3 <3)
  loader.load('/models/sg-light-destroyer-threejs/sg-light-destroyer.json', model => player.add(model.rotateY(Math.PI)))
  camera.position.z = -15;
  camera.position.y = 5;
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  let playerLight = new THREE.PointLight()
  playerLight.position.z = -5;
  player.userData = {};
  player.add(camera, playerLight);
  return player;
}
