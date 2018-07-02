import * as THREE from 'three';
import { camera } from '../player';

THREE.LOD.prototype.updateMatrixWorld = function updateMatrixWorldLOD() {
	this.update(camera);
	THREE.Object3D.prototype.updateMatrixWorld.call(this, arguments);
};
