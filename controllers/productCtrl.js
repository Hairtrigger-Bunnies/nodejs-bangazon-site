'use strict';
const passport = require('passport');

// EXPORTS MODULE THAT BRINGS UP FORM TO ADD A NEW PRODUCT TO SELL- HITS productRoute
module.exports.displayAddProduct = (req, res, nect) => {
  res.render('new-product-form');
};
