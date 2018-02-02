var express = require('express');
var JWT = require('jsonwebtoken');
var router = express.Router();
const validateToken = (req, res, next) => {
  let token = req.body.token || req.headers['token'] || req.headers['Authorization'];
  if (!token) res.status(499).send("JWT Token Required");
  JWT.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) res.status(498).send("Invalid Token");
    else next();
  })
}

/* POST */
router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = {
    email,
    displayName: "bob name"
  }
  if (email == "email" && password == "password")
    res.json({
      success: true,
      token: JWT.sign(user, process.env.SECRET_KEY, {
        expiresIn: 3600
      })
    });
  else res.sendStatus(403);
})
router.get('/secure/test', validateToken, (req, res) => {
  res.send("It worked");
})

module.exports = router;
