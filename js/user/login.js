import { user } from './';
import cookie from 'json-cookie';
import axios from 'axios';
var onSuccess;
const confirm = () => {
  console.log("Checking Confirmation")
  if (cookie.get("token"))
    axios.get('/api/secure/test', {
      headers: {
        token: cookie.get('token')
      }
    }).then(onSuccess).catch(console.log)
}
const attemptLogin = (email, password) => {
  email = email.value;
  password = password.value;
  console.log(`Attempting Login with ${email} and ${password}`)
  axios.post('/api/login', {
    email,
    password
  }).then(response => cookie.set('token', response.data.token)).then(confirm)
}
const handleSubmit = e => {
  e.preventDefault();
  console.log(e.target);
  // document.getElementById("email").value
  // document.getElementById("password").value
  attemptLogin(email, password)
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
