'use strict';

const { Router } = require('express');
const router = Router();

const {
    addPayment,
    displayAddPayment,
    destroyPayment
  } = require('../controllers/paymentCtrl.js');

router.get('/payment', displayAddPayment);
router.post('/payment', isLoggedIn, addPayment);
router.get('/deletePayment/:id', destroyPayment);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;