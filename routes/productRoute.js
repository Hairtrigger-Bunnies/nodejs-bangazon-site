'use strict';

const { Router } = require('express');
const router = Router();

const {
  displayAddProduct,
  getProdDetail //broken out this way to make it easy to list them vertically as we add functions
} = require('../controllers/productCtrl.js');

//get the product details for just one item
router.get('/product/add', displayAddProduct);
//SETS THE ROUTE TO ADD A NEW PRODUCT TO SELL
router.get('/product/:id', getProdDetail);

module.exports = router;
