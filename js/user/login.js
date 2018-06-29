import cookie from 'json-cookie';
import axios from 'axios';
import { print, printErr } from '../game/util';
import config from '../config';

let onSuccess;

const clear = () => {
	document.getElementById('login-container').remove();
};

const showError = (message = 'An error occured') => {
	print('Showing', message);
	document.getElementById('error-section').innerHTML = `<div class="error">${message}</div>`;
};

const handleError = (err) => {
	if (err.response.status === 403) {
		showError('Invalid Login Credentials');
	} else
	if (err.response.status === 498 || err.response.status === 499) {
		printErr('Validation Failed:', err.response.data);
	} else {
		printErr(err);
	}
};

const confirm = () => {
	const token = cookie.get('token');
	const { checkLogin } = config.url;
	if (token) {
		axios[checkLogin.method](checkLogin.path, {
			headers: {
				token,
			},
		}).then(() => onSuccess(token)).catch(handleError);
	}
};
const attemptLogin = (emailEl, passwordEl) => {
	const email = emailEl.value;
	const password = passwordEl.value;
	print(`Attempting Login with ${email} and ${password}`);
	const loginUrl = config.url.login;
	axios[loginUrl.method](loginUrl.path, {
		email,
		password,
	}).then(response => cookie.set('token', response.data.token, {
		expires: 1,
	})).then(confirm).catch(handleError);
};
const handleSubmit = (e) => {
	e.preventDefault();
	attemptLogin(email, password);
};
export default (cb) => {
	onSuccess = (user) => {
		print('Login Succeeded');
		clear();
		cb(user);
	};
	document.getElementById('login-container').addEventListener('submit', handleSubmit);
	confirm();

};
