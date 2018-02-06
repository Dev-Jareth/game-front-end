import * as THREE from 'three';
import { SCREEN_HEIGHT, SCREEN_WIDTH, kmToM } from '../util';
export const camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, kmToM(100000));
