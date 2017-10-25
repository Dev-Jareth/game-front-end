import * as THREE from 'three'
export default () =>{
  let geometry = new THREE.Geometry();
  for ( var i = 0; i < 10000; i ++ ) {
    let vertex = new THREE.Vector3();
    vertex.x = THREE.Math.randFloatSpread( 2000 );
    vertex.y = THREE.Math.randFloatSpread( 2000 );
    vertex.z = THREE.Math.randFloatSpread( 2000 );
    geometry.vertices.push( vertex );
  }
  var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
  return particles
}