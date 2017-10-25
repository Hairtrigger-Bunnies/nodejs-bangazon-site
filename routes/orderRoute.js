'use strict';

const { Router } = require('express');
const router = Router();

const {
    checkMakeOrder,
    getOpenOrder
  } = require('../controllers/orderCtrl.js');

router.post('/order/:id', isLoggedIn, checkMakeOrder);
router.get('/cart', isLoggedIn, getOpenOrder);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
