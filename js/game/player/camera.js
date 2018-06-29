import * as THREE from 'three';
import { SCREEN, kmToM } from '../util';

export default new THREE.PerspectiveCamera(75, SCREEN.WIDTH / SCREEN.HEIGHT, 0.1, kmToM(100000));
