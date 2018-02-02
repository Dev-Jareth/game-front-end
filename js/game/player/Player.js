import * as THREE from 'three';
export const Player = camera => {
  var player = new THREE.Group();
  player.name = "Player"
  var loader = new THREE.ObjectLoader()
  var geometry = new THREE.BoxGeometry(4, 2, 10);
  var material = new THREE.MeshPhongMaterial({
    color: 0x00ff00
  });
  var cubeGeometry = new THREE.CylinderGeometry(0, 5, 10, 4, 4);
  var cubeMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color('rgb(200,80,80)')
  });
  //model from clara.io (<3 <3 <3)
  loader.load('/models/sg-light-destroyer-threejs/sg-light-destroyer.json', model => player.add(model.rotateY(Math.PI)))
  // player.add(new THREE.Mesh(cubeGeometry, cubeMaterial));
  var playerLight = new THREE.PointLight()
  camera.position.z = -15;
  camera.position.y = 5;
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  playerLight.position.z = -5;
  player.add(playerLight)
  player.add(camera);
  player.userData = {};
  return player;
}
