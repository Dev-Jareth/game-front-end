const args = {
	pressed: false,
	rate: 0,
	serverState: false,
};
const generateKeyboard = array => array.reduce((obj, el) => {
	return { ...obj, [el]: { ...args } };
}, {});
export default generateKeyboard(['w', 'a', 's', 'd', 'q', 'e', 'space', 'shift']);
