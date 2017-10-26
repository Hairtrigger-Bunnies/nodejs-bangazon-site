'use strict';

const { Router } = require('express');
const router = Router();

const {
    checkMakeOrder,
    destroyOrder,
    destroyProductFromOrder,
    getOpenOrder,
    countEachProdOnOrder,
    renderCompleteOrderView,
    payForOrder,
    renderThanksPage
  } = require('../controllers/orderCtrl.js');

router.post('/order/:id', isLoggedIn, checkMakeOrder);
router.post('/order/complete/:id', isLoggedIn, payForOrder);
router.get('/order/:id', isLoggedIn, renderCompleteOrderView);
router.get('/delete_order', isLoggedIn, destroyOrder);
router.get('/remove_order_product/:id', isLoggedIn, destroyProductFromOrder);
router.get('/cart', isLoggedIn, getOpenOrder, countEachProdOnOrder);
router.get('/confirm', isLoggedIn, renderThanksPage);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
