import React, { Component } from "react";
import * as THREE from "three";
export class Home extends Component {
  constructor() {
    super();
    this.scene = new THREE.Scene();
    this.geometry = new THREE.BoxGeometry(200, 200, 200);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffa0a0
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    let light = new THREE.PointLight(0x404040);
    light.position.z = 1000;
    this.scene.add(this.mesh);
    this.scene.add(light);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  }

  componentDidMount = () => {
    this.container.appendChild(this.renderer.domElement);
    this.animate();
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.mesh.rotation.x += Math.PI * 0.01;
    this.mesh.rotation.y += Math.PI * 0.01;
    this.renderer.render(this.scene, this.camera);
    //   this.render()
  };

  render() {
    if (typeof window !== "undefined") {
      this.camera.position.z = 1000;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      return (
        <div
          style={{ width: "inherit", height: "inherit", position: "absolute" }}
          ref={thisNode => (this.container = thisNode)}
        />
      );
    } else {
      return null;
    }
  }
}
