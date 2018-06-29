import * as THREE from 'three';

THREE.Gyroscope = function () {

	THREE.Object3D.call(this);

};

THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope;

THREE.Gyroscope.prototype.updateMatrixWorld = (function () {

	const translationObject = new THREE.Vector3();
	const quaternionObject = new THREE.Quaternion();
	const scaleObject = new THREE.Vector3();

	const translationWorld = new THREE.Vector3();
	const quaternionWorld = new THREE.Quaternion();
	const scaleWorld = new THREE.Vector3();

	return function updateMatrixWorld(force) {

		this.matrixAutoUpdate && this.updateMatrix();

		// update matrixWorld

		if (this.matrixWorldNeedsUpdate || force) {

			if (this.parent !== null) {

				this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

				this.matrixWorld.decompose(translationWorld, quaternionWorld, scaleWorld);
				this.matrix.decompose(translationObject, quaternionObject, scaleObject);

				this.matrixWorld.compose(translationWorld, quaternionObject, scaleWorld);


			} else {

				this.matrixWorld.copy(this.matrix);

			}


			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for (let i = 0, l = this.children.length; i < l; i++) {

			this.children[i].updateMatrixWorld(force);

		}

	};

}());
