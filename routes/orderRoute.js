'use strict';

const { Router } = require('express');
const router = Router();

const {
    checkMakeOrder,
    getOpenOrder,
    countEachProdOnOrder,
    renderCompleteOrderView,
    payForOrder,
    renderThanksPage
  } = require('../controllers/orderCtrl.js');

router.post('/order/:id', isLoggedIn, checkMakeOrder);
router.post('/order/complete/:id', isLoggedIn, payForOrder);
router.get('/order/:id', isLoggedIn, renderCompleteOrderView);
router.get('/cart', isLoggedIn, getOpenOrder, countEachProdOnOrder);
router.get('/confirm', isLoggedIn, renderThanksPage);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
