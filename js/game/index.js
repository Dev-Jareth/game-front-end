import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({ antialias: true });
import { Planet, StarCloud } from './models';
const scene = new THREE.Scene();
const kmToM = km=>km*1000;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, kmToM(100000));
const map = {
    x: { min: kmToM(-100000), max: kmToM(100000) },
    y: { min: kmToM(-100000), max: kmToM(100000) },
    z: { min: kmToM(-100000), max: kmToM(100000) },
    player: {
        coords: {
            x: 0, y: 0, z: 5, set: vector => {
                map.player.coords.x = vector.x;
                map.player.coords.y = vector.y;
                map.player.coords.z = vector.z;
            }
        },
        rotation: {
            x: 0, y: 0, z: 0, set: vector => {

                map.player.rotation.x = vector.x;
                map.player.rotation.y = vector.y;
                map.player.rotation.z = vector.z;
            }
        },
    },
    objects: []
}
const generateKeyboard = array => {
    let response = {};
    array.forEach(el => (response = { ...response, [el]: { pressed: false, rate: 0, serverState: false } }), this);
    return response;
};
const keyboard = generateKeyboard(["w", "a", "s", "d", "q", "e", "space", "shift"]);
console.log(keyboard)

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
const addEventListeners = () => {
    document.addEventListener("keydown", _keyDown);
    document.addEventListener("keyup", _keyUp);
}
const calculatePlayerMove = () => {
    // requestPlayerMove();
    let { w, a, s, d, q, e, space, shift } = { ...keyboard };
    let damperStrength = 2 / 100;
    let engineStrength = 5 / 100;
    let maxSpeed = 5;
    let maxReverse = 2;
    let maxManouver = 2;

    //W
    w.serverState
        ? (w.rate = Math.min(maxSpeed, w.rate + engineStrength))
        : (w.rate = Math.max(0, w.rate - engineStrength));
    player.translateZ(w.rate);
    // w.rate !== 0 ? this.player.engines.scale.set(1, 1, w.rate / 3) : void 0;
    // w.rate !== 0 ? (this.player.engines.children[0].material[0].opacity = 0.1 * (w.rate / 3)) : void 0;
    //S
    s.serverState
        ? (s.rate = Math.min(maxReverse, s.rate + damperStrength))
        : (s.rate = Math.max(0, s.rate - damperStrength));
    player.translateZ(-s.rate);
    //A
    a.serverState
        ? (a.rate = Math.min(maxManouver, a.rate + damperStrength))
        : (a.rate = Math.max(0, a.rate - damperStrength));
    player.rotateZ(a.rate * -0.01);
    //D
    d.serverState
        ? (d.rate = Math.min(maxManouver, d.rate + damperStrength))
        : (d.rate = Math.max(0, d.rate - damperStrength));
    player.rotateZ(d.rate * 0.01);
    //Q
    q.serverState
        ? (q.rate = Math.min(maxManouver, q.rate + damperStrength))
        : (q.rate = Math.max(0, q.rate - damperStrength));
    player.rotateY(q.rate * 0.008);
    //E
    e.serverState
        ? (e.rate = Math.min(maxManouver, e.rate + damperStrength))
        : (e.rate = Math.max(0, e.rate - damperStrength));
    player.rotateY(e.rate * -0.008);
    //SPACE
    space.serverState
        ? (space.rate = Math.min(maxManouver, space.rate + damperStrength))
        : (space.rate = Math.max(0, space.rate - damperStrength));
    player.rotateX(space.rate * -0.01);
    //SHIFT
    shift.serverState
        ? (shift.rate = Math.min(maxManouver, shift.rate + damperStrength))
        : (shift.rate = Math.max(0, shift.rate - damperStrength));
    player.rotateX(shift.rate * 0.01);
};
const _keyDown = e => {
    let key = e.key === " " ? "space" : e.key.toLowerCase();
    // keyboard[key] ? (keyboard[key].pressed = true) : void 0;
    keyboard[key] ? (keyboard[key].serverState = true) : void 0;
};
const _keyUp = e => {
    let key = e.key === " " ? "space" : e.key.toLowerCase();
    // keyboard[key] ? (keyboard[key].pressed = false) : void 0;
    keyboard[key] ? (keyboard[key].serverState = false) : void 0;
};
var player = new THREE.Group();
const game = (gameContainer = document.getElementById('game-container')) => {
    let ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    let pointLight = new THREE.PointLight();
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(StarCloud({density:0.001,coords:{x:map.x,y:map.y,z:map.z}}))
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    gameContainer.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(4, 2, 10);
    var material = new THREE.MeshPhongMaterial({ color: 0x00ff00});
    // var cube = new THREE.Mesh(geometry, material);
    var earth = Planet({ radius: kmToM(6371) })
    player.add(new THREE.Mesh(geometry, material));
    player.add(camera);
    scene.add(player);
    player.position.z = -1000;
    camera.position.z = -15;
    camera.position.y = 5;
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    map.objects.push(earth);
    earth.position.z = kmToM(6371);
    scene.add(earth);
    animate();
    addEventListeners();
}
const animate = () => {
    calculatePlayerMove();
    map.player.coords.set(player.getWorldPosition());
    map.player.rotation.set(player.getWorldRotation());

    // camera.position.set(playerLoc.x, playerLoc.y, playerLoc.z);
    map.objects[0].rotation.x += 0.001;
    map.objects[0].rotation.y += 0.001;
    //Draw & Re-call//
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight;
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export default game;