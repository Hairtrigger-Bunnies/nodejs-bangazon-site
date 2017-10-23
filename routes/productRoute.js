'use strict';

const { Router } = require('express');
const router = Router();

const {
    getProdDetail
  } = require('../controllers/productCtrl.js');

router.get('/product/:id', getProdDetail);


module.exports = router;