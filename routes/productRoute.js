'use strict';

const { Router } = require('express');
const router = Router();

const { displayAddProduct } = require('../controllers/productCtrl');

//SETS THE ROUTE TO ADD A NEW PRODUCT TO SELL
router.get('/product/add', displayAddProduct);

module.exports = router;
