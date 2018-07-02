import * as THREE from 'three';
import camera from './camera';
import SkyBox from './skybox';

const loader = new THREE.ObjectLoader();

const player = new THREE.Group();
player.name = 'Player';
// model from clara.io (<3 <3 <3)
loader.load('/models/sg-light-destroyer-threejs/sg-light-destroyer.json', model => player.add(model.rotateY(Math.PI)));
camera.position.z = -15;
camera.position.y = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));
player.camera = camera;
const playerLight = new THREE.PointLight();
playerLight.position.z = -5;
player.skybox = SkyBox();
player.add(player.camera, playerLight, player.skybox);
export default player;
