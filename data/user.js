const users = {
  "name@mail.com": {
    "password": "password",
    "displayName": "FreddoBar",
    "unit": "m",
    "coords": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "rotation": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  },
  "credits": 1000,
  "xp": 500
}

const validateUser = (email, password) => email in users && users[email].password == password;
const getUserByEmail = email => users[email]
const getUserFacadeByEmail = email => {
  let b = {
    ...getUserByEmail(email),
    password: undefined
  }
  console.log("Response: ", JSON.stringify(b))
  return b;
}
module.exports = {
  validateUser,
  getUserByEmail,
  getUserFacadeByEmail
}
