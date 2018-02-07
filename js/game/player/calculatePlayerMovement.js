import player, { keyboard } from './'
export const calculatePlayerMove = args => {
  player.userData.physics = player.userData.physics || {};
  let playerPhysics = player.userData.physics;
  // requestPlayerMove();
  let {w, a, s, d, q, e, space, shift} = {
    ...keyboard
  };
  let tempModifier = 5000;
  let damperStrength = 2 / 100;
  let engineStrength = 5 * tempModifier / 100;
  let maxSpeed = 5 * tempModifier;
  let maxReverse = 2 * tempModifier;
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

  //SET physics
  playerPhysics.rotation = playerPhysics.rotation || {};
  playerPhysics.velocity = w.rate - s.rate;
  playerPhysics.rotation.x = space.rate - shift.rate;
  playerPhysics.rotation.y = q.rate - e.rate;
  playerPhysics.rotation.z = a.rate - d.rate;
};
