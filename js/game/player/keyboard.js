const generateKeyboard = array => {
  let response = {};
  array.forEach(el => (response = {
    ...response,
    [el]: {
      pressed: false,
      rate: 0,
      serverState: false
    }
  }), this);
  return response;
};
export const keyboard = generateKeyboard(["w", "a", "s", "d", "q", "e", "space", "shift"]);
