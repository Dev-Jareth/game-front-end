import * as THREE from "three";
/**
 * M = planetMass
 * m = satelliteMass
 * F=GMm/r^2
 * F=ma = mv^2
 * v^2 = GMm/mr^2 = GM/r^2
 * v = sqrt(GM/r^2)
 * 
 * w=v/r
 * w=s/rt, s=2PI
 * t=s/wr = 2PI/wr = 2PI/v
 * 
 * r=planetRadius
 * R=orbitRadius
 * v ∝ c
 * v ∝ m ∝ r^3
 * v ∝ R^-2
 * R ∝ r (if R not set)
 * v ∝ r (if R not set)
 * 
 * 
 * t ∝ c^-1
 */
const calculateOrbiterVelocity = (planetRadius, orbitRadius) => {
  let planetDensityCoefficient = 5.515;
  let G = 6.67 * Math.pow(10, -11);
  let mass = planetDensityCoefficient * Math.pow(planetRadius, 3);
  let velocity = Math.sqrt(G * mass / Math.pow(orbitRadius, 2));
  let timePeriod = 2 * Math.PI / velocity;
  return velocity;
};
const scale = 1;
const orbitScale = 1;

export default (radius = 100, satelliteRadius, orbitDistance = radius + satelliteRadius) => {
  let accuracy = 100;
  let geometry = new THREE.SphereGeometry(radius * scale, accuracy, accuracy);
  let material = new THREE.MeshPhongMaterial();
  let planet = new THREE.Mesh(geometry, material);
  let loader = new THREE.JSONLoader();
  material.map = new THREE.ImageUtils.loadTexture('./models/Planet/1_earth_16k.jpg')
  material.bumpMap = new THREE.ImageUtils.loadTexture('./models/Planet/Bump.jpg')
  // loader.load("./models/planet.json", (geo, mat) => {
  //   planet.geometry = geo;
  //   planet.material = mat;
  //   console.log(mat)
  // });
  let group = new THREE.Group();
  group.add(planet);
  let angularVelocity = 0.0001;
  let animate = {
    planet: t => {
      requestAnimationFrame(animate.planet)
      planet.rotation.y = (t * angularVelocity) % (2 * Math.PI);
    }
  };
  animate.planet();
  if (satelliteRadius) {
    let geometry = new THREE.SphereGeometry(satelliteRadius * scale, accuracy, accuracy);
    let satellite = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xf8f8f8 }));
    satellite.position.x = orbitDistance;
    group.add(satellite);
    let velocity = calculateOrbiterVelocity(radius, orbitDistance);
    animate.satellite = t => {
      t = (t * velocity) % (2 * Math.PI);
      requestAnimationFrame(animate.satellite);
      satellite.position.x = Math.sin(t) * orbitDistance * scale * orbitScale;
      satellite.position.y = Math.cos(t) * orbitDistance * scale * orbitScale;
      satellite.position.z = Math.cos(t) * orbitDistance * scale * orbitScale;
    };
    animate.satellite();
  }
  return group;
};
