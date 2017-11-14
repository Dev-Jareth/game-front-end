import React, { Component } from "react";
import { socketServer } from "../../config";
import io from "socket.io-client";
import * as THREE from "three";
import ParticleCloud from "./ParticleCloud.three.js";
import Planet from "./Planet.three.js";
import Player from "./Player.three.js";
const socket = io(socketServer.baseUrl);
const generateKeyboard = array => {
  let response = {};
  array.forEach(el => (response = { ...response, [el]: { pressed: false, rate: 0, serverState: false } }), this);
  return response;
};
const settings = {
  mapDimensions: 2000000,
  lowX: () => -settings.mapDimensions / 2,
  lowY: () => -settings.mapDimensions / 2,
  lowZ: () => -settings.mapDimensions / 2,
  highX: () => settings.mapDimensions / 2,
  highY: () => settings.mapDimensions / 2,
  highZ: () => settings.mapDimensions / 2
};
const collidableObjects = [];
const camera = () => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, -1);
const renderer = () => new THREE.WebGLRenderer({ antialias: true });
const planet = ({ planetRadius, satelliteRadius, orbitRadius, position } = {}) => {
  let newPlanet = new Planet(planetRadius, satelliteRadius, orbitRadius);
  if (position) {
    let { x, y, z } = position;
    newPlanet.position.set(x, y, z);
  }
  return newPlanet;
};
const assignLights = scene => {
  let { lowX, lowY, lowZ, highX, highY, highZ } = settings;
  lowX = lowX();
  lowY = lowY();
  lowZ = lowZ();
  highX = highX();
  highY = highY();
  highZ = highZ();
  let lights = {};
  let lightProps = [0x404040, 0.1];
  lights.xlylzl = new THREE.PointLight(...lightProps);
  lights.xlyhzl = new THREE.PointLight(...lightProps);
  lights.xlylzh = new THREE.PointLight(...lightProps);
  lights.xlyhzh = new THREE.PointLight(...lightProps);
  lights.xhylzl = new THREE.PointLight(...lightProps);
  lights.xhyhzl = new THREE.PointLight(...lightProps);
  lights.xhylzh = new THREE.PointLight(...lightProps);
  lights.xhyhzh = new THREE.PointLight(...lightProps);
  let { xlylzl, xlyhzl, xlylzh, xlyhzh, xhylzl, xhyhzl, xhylzh, xhyhzh } = lights;
  xlylzl.position.set(lowX, lowY, lowZ);
  xlyhzl.position.set(lowX, highY, lowZ);
  xlylzh.position.set(lowX, lowY, highZ);
  xlyhzh.position.set(lowX, highY, highZ);
  xhylzl.position.set(highX, lowY, lowZ);
  xhyhzl.position.set(highX, highY, lowZ);
  xhylzh.position.set(highX, lowY, highZ);
  xhyhzh.position.set(highX, highY, highZ);
  for (var key in lights) scene.add(lights[key]);
};
const getMeshs = obj => {
  let meshs = [];
  let traverse = ch => {
    ch.type === "Mesh" ? meshs.push(ch) : ch.children.forEach(traverse);
  };
  traverse(obj);
  return meshs;
};
export class Home extends Component {
  constructor() {
    super();
    this.scene = new THREE.Scene();
    this.renderer = renderer();
    this.camera = camera();
    this.player = new Player("ship", this.camera, this.renderer.domElement);
    let earth = new planet({
      planetRadius: 6371,
      satelliteRadius: 1737,
      orbitRadius: 384400,
      position: new THREE.Vector3(0, 0, 1500)
    });
    collidableObjects.push(earth);
    this.scene.add(new THREE.AmbientLight(0x404040, 0.3));
    this.scene.add(this.player);
    assignLights(this.scene);
    this.keyboard = generateKeyboard(["w", "a", "s", "d", "q", "e", "space", "shift"]);
    this.scene.add(new ParticleCloud(settings.mapDimensions / 2, 2 / settings.mapDimensions));
    this.scene.add(...collidableObjects);
    socket.on("serverPlayerMove", data => {
      this.keyboard[data.key].serverState = data.isPressed;
    });
  }
  didCrashOccur = () => {
    let wasCollision = false;
    collidableObjects.forEach(obj => {
      this.didBoundingBoxCollide(obj) ? (wasCollision = true) : void 0;
    });
    return wasCollision;
  };
  // didActualCollide = target => {
  //   let findMesh = obj => obj.geometry?obj:obj.children.forEach(findMesh);
  //   this.player.ship.children[0].geometry.vertices.forEach(vert=>{
  //     let localVert = vert.clone();
  //     let globalVert = this.player.matrix.multiplyVector3(localVert);
  //     let directionVector = globalVert.sub(this.player.position);
  //     let ray = new THREE.Ray(Player.position,directionVector.clone().normalize())
  //     if(target.geometry){//is mesh
  //       mesh.geometry.vertices.forEach(tvert=>ray.distanceToPoint(tvert) < directionVector.length()?console.log('collision'):void(0))
  //     } else {//is container
  //     target.children.forEach(mesh=>{
  //       mesh.geometry.vertices.forEach(tvert=>ray.distanceToPoint(tvert) < directionVector.length()?console.log('collision'):void(0))
  //     })}
  //     // if(collisionResult.length > 0 && collisionResult[0].distance < directionVector.length()) console.log("Collision")
  //   })
  // }
  crash = () => {
    alert("You Crashed!");
    this.player.position.set(0, 0, 0);
  };
  didBoundingBoxCollide = target => {
    let boxCollided;
    let bbts = [];
    getMeshs(target).forEach(mesh => bbts.push(new THREE.Box3().setFromObject(mesh)));
    let ship = getMeshs(this.player)[0];
    let bbp = new THREE.Box3().setFromObject(ship || this.player); //ship is not loaded initially so this.player used
    bbts.forEach(bbt => {
      if (
        bbp.min.x <= bbt.max.x &&
        bbp.max.x >= bbt.min.x &&
        bbp.min.y <= bbt.max.y &&
        bbp.max.y >= bbt.min.y &&
        bbp.min.z <= bbt.max.z &&
        bbp.max.z >= bbt.min.z
      )
        boxCollided = true;
    });
    return boxCollided;
  };
  requestPlayerMove = () => {
    let keyboard = this.keyboard;
    Object.keys(keyboard).forEach(
      key =>
        keyboard[key].pressed !== keyboard[key].serverState
          ? socket.emit("clientPlayerMove", { key, isPressed: keyboard[key].pressed })
          : void 0
    );
  };
  calculatePlayerMove = () => {
    this.requestPlayerMove();
    let { w, a, s, d, q, e, space, shift } = { ...this.keyboard };
    let damperStrength = 2 / 100;
    let engineStrength = 5 / 100;
    let maxSpeed = 5;
    let maxReverse = 2;
    let maxManouver = 2;

    //W
    w.serverState
      ? (w.rate = Math.min(maxSpeed, w.rate + engineStrength))
      : (w.rate = Math.max(0, w.rate - engineStrength));
    this.player.translateZ(w.rate);
    w.rate !== 0 ? this.player.engines.scale.set(1, 1, w.rate / 3) : void 0;
    w.rate !== 0 ? (this.player.engines.children[0].material[0].opacity = 0.1 * (w.rate / 3)) : void 0;
    //S
    s.serverState
      ? (s.rate = Math.min(maxReverse, s.rate + damperStrength))
      : (s.rate = Math.max(0, s.rate - damperStrength));
    this.player.translateZ(-s.rate);
    //A
    a.serverState
      ? (a.rate = Math.min(maxManouver, a.rate + damperStrength))
      : (a.rate = Math.max(0, a.rate - damperStrength));
    this.player.rotateZ(a.rate * -0.01);
    //D
    d.serverState
      ? (d.rate = Math.min(maxManouver, d.rate + damperStrength))
      : (d.rate = Math.max(0, d.rate - damperStrength));
    this.player.rotateZ(d.rate * 0.01);
    //Q
    q.serverState
      ? (q.rate = Math.min(maxManouver, q.rate + damperStrength))
      : (q.rate = Math.max(0, q.rate - damperStrength));
    this.player.rotateY(q.rate * 0.008);
    //E
    e.serverState
      ? (e.rate = Math.min(maxManouver, e.rate + damperStrength))
      : (e.rate = Math.max(0, e.rate - damperStrength));
    this.player.rotateY(e.rate * -0.008);
    //SPACE
    space.serverState
      ? (space.rate = Math.min(maxManouver, space.rate + damperStrength))
      : (space.rate = Math.max(0, space.rate - damperStrength));
    this.player.rotateX(space.rate * -0.01);
    //SHIFT
    shift.serverState
      ? (shift.rate = Math.min(maxManouver, shift.rate + damperStrength))
      : (shift.rate = Math.max(0, shift.rate - damperStrength));
    this.player.rotateX(shift.rate * 0.01);
  };
  _keyDown = e => {
    let key = e.key === " " ? "space" : e.key.toLowerCase();
    this.keyboard[key] ? (this.keyboard[key].pressed = true) : void 0;
  };
  _keyUp = e => {
    let key = e.key === " " ? "space" : e.key.toLowerCase();
    this.keyboard[key] ? (this.keyboard[key].pressed = false) : void 0;
  };
  componentDidMount = () => {
    this.container.appendChild(this.renderer.domElement);
    document.addEventListener("keydown", this._keyDown);
    document.addEventListener("keyup", this._keyUp);
    window.addEventListener("resize",()=>{
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    },false)

    this.animate();
  };
  animate = () => {
    this.calculatePlayerMove();
    this.renderer.render(this.scene, this.camera);
    this.didCrashOccur() ? this.crash() : void 0;
    requestAnimationFrame(this.animate);
  };

  render() {
    if (typeof window !== "undefined") {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      return <div ref={thisNode => (this.container = thisNode)} />;
    } else {
      return null;
    }
  }
}
