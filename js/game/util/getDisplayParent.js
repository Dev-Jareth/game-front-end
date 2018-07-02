import * as THREE from 'three';

const getDisplayParent = o => (o.parent instanceof THREE.Scene ? o : getDisplayParent(o.parent));
export default getDisplayParent;
