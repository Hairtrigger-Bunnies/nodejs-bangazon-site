'use strict';

const passport = require('passport');

module.exports.addPayment = (req, res, next) => {
  const { Payment_Type } = req.app.get('models');
  Payment_Type.create({
    name: req.body.name,
    account_number: req.body.account_number,
    user_id: req.body.user.id
  })
  .then((data) => {
    res.status(200).redirect(`/payment/${data.dataValues.id}`);
  })
  .catch((err) => {
    res.status(200).json(err);
  })
};