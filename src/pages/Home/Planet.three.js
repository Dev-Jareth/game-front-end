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
  let G = 6.67*Math.pow(10,-11);
  let mass = planetDensityCoefficient * Math.pow(planetRadius, 3);
  let velocity = Math.sqrt(G * mass / Math.pow(orbitRadius, 2));
  let timePeriod = 2 * Math.PI / velocity;
  console.log(timePeriod+"s")
  return velocity;
};
export default (radius = 100, satelliteRadius, orbitDistance = radius + satelliteRadius) => {
  let accuracy = 100;
  let geometry = new THREE.SphereGeometry(radius, accuracy, accuracy);
  let planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x118888 }));
  let group = new THREE.Group();
  group.add(planet);
  let animate = null;
  if (satelliteRadius) {
    orbitDistance = orbitDistance + radius;
    let geometry = new THREE.SphereGeometry(satelliteRadius, accuracy, accuracy);
    let satellite = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xf8f8f8 }));
    satellite.position.x = orbitDistance;
    group.add(satellite);
    let velocity = calculateOrbiterVelocity(radius, orbitDistance);
    animate = t => {
      t = (t * velocity / (1)) % (2 * Math.PI);
      requestAnimationFrame(animate);
      satellite.position.x = Math.sin(t) * orbitDistance;
      satellite.position.y = Math.cos(t) * orbitDistance;
      satellite.position.z = Math.cos(t) * orbitDistance;
    };
    animate()
  }
  return group;
};