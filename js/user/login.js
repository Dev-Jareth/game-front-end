import { user } from './';
import jwt from 'jsonwebtoken';
import cookie from 'json-cookie';
import config from '../config'
import axios from 'axios';
var onSuccess;

const confirm = () => {
  let token = cookie.get("token");
  console.log("Cookie", jwt.decode(token))
  let checkLogin = config.url.checkLogin;
  if (token)
    axios[checkLogin.method](checkLogin.path, {
      headers: {
        token
      }
    }).then(() => onSuccess(jwt.decode(token))).catch(handleError)
}
const attemptLogin = (email, password) => {
  email = email.value;
  password = password.value;
  console.log(`Attempting Login with ${email} and ${password}`)
  let loginUrl = config.url.login;
  axios[loginUrl.method](loginUrl.path, {
    email,
    password
  }).then(response => cookie.set('token', response.data.token, {
    expires: 1
  })).then(confirm).catch(handleError)
}
const handleError = err => {
  console.log(err)
  if (err.response.status == 403) {
    showError("Invalid Login Credentials")
  }
  if (err.response.status == 498 || err.response.status == 499) {
    console.error("Validation Failed:", err.response.data)
  }
}
const handleSubmit = e => {
  e.preventDefault();
  attemptLogin(email, password)
}
const showError = (message = "An error occured") => {
  console.log("Showing", message)
  document.getElementById('error-section').innerHTML = `<div class="error">${message}</div>`;
}
export const login = cb => {
  onSuccess = user => {
    console.log("Login Succeeded")
    clear();
    cb(user);
  };
  document.getElementById("login-container").addEventListener("submit", handleSubmit)
  confirm();

}
const clear = () => {
  document.getElementById('login-container').remove();
}