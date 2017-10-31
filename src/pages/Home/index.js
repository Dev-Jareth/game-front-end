import React, { Component } from "react";
import * as THREE from "three";
import ParticleCloud from "./ParticleCloud.three.js";
import Planet from "./Planet.three.js";
import Player from "./Player.three.js";
const generateKeyboard = array => {
  let response = {};
  array.forEach(el => (response = { ...response, [el]: { pressed: false, rate: 0 } }), this);
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
    this.scene.add(earth);
    this.scene.add(new THREE.AmbientLight(0x404040, 0.3));
    this.scene.add(this.player);
    assignLights(this.scene);
    this.keyboard = generateKeyboard(["w", "a", "s", "d", "q", "e", "space", "shift"]);
    this.scene.add(new ParticleCloud(settings.mapDimensions / 2, 2 / settings.mapDimensions));
  }
  calculatePlayerMove = () => {
    let { w, a, s, d, q, e, space, shift } = { ...this.keyboard };
    let damperStrength = 5 / 100;
    let accelStrength = 5 / 100;
    let maxSpeed = 5;

    //W
    w.pressed
      ? (w.rate = Math.min(maxSpeed, Math.max(1, w.rate + accelStrength)))
      : (w.rate = Math.max(0, w.rate - damperStrength));
    this.player.translateZ(w.rate);
    //S
    s.pressed
      ? (s.rate = Math.min(maxSpeed, Math.max(1, s.rate + accelStrength)))
      : (s.rate = Math.max(0, s.rate - damperStrength));
    this.player.translateZ(-s.rate);
    //A
    a.pressed ? (a.rate = 1) : (a.rate = Math.max(0, a.rate - damperStrength));
    this.player.rotateZ(a.rate * -0.01);
    //D
    d.pressed ? (d.rate = 1) : (d.rate = Math.max(0, d.rate - damperStrength));
    this.player.rotateZ(d.rate * 0.01);
    //Q
    q.pressed ? (q.rate = 1) : (q.rate = Math.max(0, q.rate - damperStrength));
    this.player.rotateY(q.rate * 0.008);
    //E
    e.pressed ? (e.rate = 1) : (e.rate = Math.max(0, e.rate - damperStrength));
    this.player.rotateY(e.rate * -0.008);
    //SPACE
    space.pressed ? (space.rate = 1) : (space.rate = Math.max(0, space.rate - damperStrength));
    this.player.rotateX(space.rate * -0.01);
    //SHIFT
    shift.pressed ? (shift.rate = 1) : (shift.rate = Math.max(0, shift.rate - damperStrength));
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

    this.animate();
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.calculatePlayerMove();
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    if (typeof window !== "undefined") {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      return (
        <div
          style={{ width: "inherit", height: "inherit", overflow: "hidden" }}
          ref={thisNode => (this.container = thisNode)}
        />
      );
    } else {
      return null;
    }
  }
}
