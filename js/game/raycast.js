import * as THREE from 'three';
import { SCREEN_WIDTH, SCREEN_HEIGHT, print, printErr } from './util'
import { camera } from './player'
import { map } from './map'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

export let currentMouseTarget;

const setNewTarget = t => {
  t.object.userData.oldMaterial = t.object.material; //store material for later
  currentMouseTarget = t
}
const resetOldTarget = () => {
  currentMouseTarget.object.material = currentMouseTarget.object.userData.oldMaterial; //reset material
  currentMouseTarget = null;
}

export const raycastListener = event => {
  mouse.x = (event.clientX / SCREEN_WIDTH) * 2 - 1;
  mouse.y = -(event.clientY / SCREEN_HEIGHT) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  setMouseTarget(raycaster.intersectObjects(map.objects)[0])
}
const setMouseTarget = t => {
  if ((!t && !currentMouseTarget) || (t && currentMouseTarget && currentMouseTarget.object.uuid === t.object.uuid)) {
    return print("No new target and no current target OR new target is already set")
  }
  if (!t && currentMouseTarget) {
    resetOldTarget()
    return print("No new target.. cleared old target, reset old target material");
  }
  if (t && currentMouseTarget) {
    resetOldTarget()
    setNewTarget(t)
    return print("New target is set... reset old target")
  }
  if (t && !currentMouseTarget) {
    setNewTarget(t)
    return print("New target is set..")
  }
  printErr("Oh No! setMouseTarget didn't seem to find it")

}
