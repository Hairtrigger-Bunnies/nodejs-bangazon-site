'use strict';

const { Router } = require('express');
const router = Router();

const {
    addProduct,
    displayAddProduct,
    getProdDetail,
    destroyProduct
     //broken out this way to make it easy to list them vertically as we add functions
  } = require('../controllers/productCtrl.js');

router.post('/product', isLoggedIn, addProduct);
//get the product details for just one item
router.get('/product/add', displayAddProduct);
//SETS THE ROUTE TO ADD A NEW PRODUCT TO SELL
router.get('/product/:id', getProdDetail);
//sets route to delete product
router.get('/deleteProduct/:id', destroyProduct);

//jm: this isloggedin prevents manually going to a route when not authenticated. call before route func to check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}


module.exports = router;
