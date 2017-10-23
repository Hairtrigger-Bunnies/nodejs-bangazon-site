'use strict';

const { Router } = require('express');
const router = Router();

const {
    getProdDetail,
    addProduct
  } = require('../controllers/productCtrl.js');

router.post('/product', isLoggedIn, addProduct);

module.exports = router;

//jm: this isloggedin prevents manually going to a route when not authenticated. call before route func to check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      console.log('user', passport.User)
      return next();
  res.redirect('/login');
}