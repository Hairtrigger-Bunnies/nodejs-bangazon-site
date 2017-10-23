'use strict';

const { Router } = require('express');
const router = Router();

const {
    getProdDetail,
    addProduct
  } = require('../controllers/productCtrl.js');

router.post('/add_product', isLoggedIn, addProduct);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      console.log('user', passport.User)
      return next();
  res.redirect('/login');
}