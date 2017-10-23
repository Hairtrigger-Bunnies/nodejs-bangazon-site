'use strict';

const { Router } = require('express');
const router = Router();

const {
    getProdDetail //broken out this way to make it easy to list them vertically as we add functions
  } = require('../controllers/productCtrl.js');

//get the product details for just one item
router.get('/product/:id', getProdDetail);


module.exports = router;