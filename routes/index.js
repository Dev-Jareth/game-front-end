var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game', {
    title: 'Play'
  });
});
router.get('/login', (req, res, next) => {
  console.log(req.query)
  let error = req.query.error
  res.render('login', {
    error
  })
})
router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email == "email" && password == "password")
    res.redirect('/');
  else res.redirect('/login?error=badCredentials')
})

module.exports = router;
