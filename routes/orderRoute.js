'use strict';

const { Router } = require('express');
const router = Router();

const {
    checkMakeOrder,
    destroyOrder,
    destroyProductFromOrder
  } = require('../controllers/orderCtrl.js');

router.post('/order/:id', isLoggedIn, checkMakeOrder);
router.get('/order/:id', isLoggedIn, destroyOrder);
router.get('/order/:id', isLoggedIn, destroyProductFromOrder);



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
