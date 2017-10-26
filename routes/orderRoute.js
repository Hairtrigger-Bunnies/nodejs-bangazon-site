'use strict';

const { Router } = require('express');
const router = Router();

const {
    checkMakeOrder,
    destroyOrder,
    destroyProductFromOrder,
    getOpenOrder
  } = require('../controllers/orderCtrl.js');

router.post('/order/:id', isLoggedIn, checkMakeOrder);
router.get('/delete_order/:id', isLoggedIn, destroyOrder);
router.get('/remove_order_product/:id', isLoggedIn, destroyProductFromOrder);
router.post('/cart', isLoggedIn, getOpenOrder);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
