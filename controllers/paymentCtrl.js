'use strict';

const passport = require('passport');

module.exports.displayAddPayment = (req, res, next) => {
  if (req.user) {
    res.render('new-payment-form');  
  } else {
    return res.redirect('/');
  }
};




module.exports.addPayment = (req, res, next) => {
  const { Payment_Type } = req.app.get('models');
  Payment_Type.create({
    name: req.body.name,
    account_number: req.body.account_number,
    user_id: req.user.id
  })
  .then((data) => {
    res.redirect(`/user/${req.user.id}`);
  })
  .catch((err) => {
    res.status(200).json(err);
  })
};