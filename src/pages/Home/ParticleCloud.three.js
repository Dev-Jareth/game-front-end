import * as THREE from 'three'
export default (diameter=2000,density=1) =>{
  density *= Math.pow(10,-8);
  let points = Math.pow(diameter,3)*density;
  let geometry = new THREE.Geometry();
  for ( var i = 0; i < points; i ++ ) {
    let vertex = new THREE.Vector3();
    vertex.x = THREE.Math.randFloatSpread( diameter );
    vertex.y = THREE.Math.randFloatSpread( diameter );
    vertex.z = THREE.Math.randFloatSpread( diameter );
    geometry.vertices.push( vertex );
  }
  var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
  return particles
}