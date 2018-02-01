import { user } from './';
import cookie from 'json-cookie';
import axios from 'axios';
var onSuccess;

const confirm = () => {
  let token = cookie.get("token");
  console.log("Cookie", token)
  if (token)
    axios.get('/api/secure/test', {
      headers: {
        token
      }
    }).then(onSuccess).catch(handleError)
}
const attemptLogin = (email, password) => {
  email = email.value;
  password = password.value;
  console.log(`Attempting Login with ${email} and ${password}`)
  axios.post('/api/login', {
    email,
    password
  }).then(response => cookie.set('token', response.data.token, {
    expires: 1
  })).then(confirm).catch(handleError)
}
const handleError = err => {
  console.log(err)
  if (err.response.status == 401) {
    showError("Invalid Login Credentials")
  }
  if (err.response.status == 403) {
    showError("Invalid Login Credentials")
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
  onSuccess = () => {
    console.log("Success!")
    clear();
    cb();
  };
  document.getElementById("login-container").addEventListener("submit", handleSubmit)
  confirm();

}
const clear = () => {
  document.getElementById('login-container').remove();
}
