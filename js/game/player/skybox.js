import * as THREE from 'three';
import { StarCloud } from '../models';
import { map } from '../map';

const SkyBox = () => {
	const starCloud = new StarCloud({
		density: 0.0005,
		coords: {
			x: map.x,
			y: map.y,
			z: map.z,
		},
	});
	// starCloud.onBeforeRender = (renderer, scene, camera, geometry, material, group) => geometry.rotateX(0.01);
	const gyro = new THREE.Gyroscope();
	gyro.add(starCloud);
	return gyro;
};
export default SkyBox;
