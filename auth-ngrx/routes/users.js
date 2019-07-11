var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var userService = require('../service/user.service');

const SECRET = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

/* user authenticate */
router.post('/authenticate', function(req, res, next) {
  // res.send('respond with a resource');
  let username = req.body.username.toLowerCase();
  let password = req.body.password.toLowerCase();

  userService.authenticate(username, password)
              .then((result) => {
                // console.log(result);
                if(result) {
                  let token = jwt.sign({ username: username }, SECRET, {
                    'expiresIn': '1h'
                  });
                  res.json({ success: true, payload: token });
                } else {
                  res.json({ success: false, payload: 'please check user name and password!' });
                }
              })
              .catch(err => {
                res.status(400).send(err);
              });
});

/** get user from token*/
router.post('/currentUser', (req, res) => {
  var token = req.body.token;
  if(token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if(err) {
        res.status(400).send({success: false});
      } else {
        res.send({success: true, payload: decoded.username});
      }
    })
  } else {
    res.status(400).send({success: false, payload: 'no token'});
  }
});

module.exports = {
  router: router, SECRET: SECRET
};
