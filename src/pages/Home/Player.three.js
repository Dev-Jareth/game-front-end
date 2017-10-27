import * as THREE from 'three';
export default (ship='ship',camera) => {
    const player = new THREE.Object3D();
    
    
    player.add(camera);
    let loader = new THREE.JSONLoader();
    loader.load(`./models/${ship}.json`, (geo, mat) => player.add(new THREE.Mesh(geo, mat)));
    
    camera.position.z = -6;
    camera.rotation.y = Math.PI;
    camera.position.y = 2;
    return player;
}