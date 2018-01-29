import { keyboard } from './';

export const _keyDown = e => {
  let key = e.key === " " ? "space" : e.key.toLowerCase();
  // keyboard[key] ? (keyboard[key].pressed = true) : void 0;
  keyboard[key] ? (keyboard[key].serverState = true) : void 0;
};
export const _keyUp = e => {
  let key = e.key === " " ? "space" : e.key.toLowerCase();
  // keyboard[key] ? (keyboard[key].pressed = false) : void 0;
  keyboard[key] ? (keyboard[key].serverState = false) : void 0;
};
export const keyboardListeners = {
  _keyUp,
  _keyDown
}
