'use strict';

const { Router } = require('express');
const router = Router();

const {
  //broken out this way to make it easy to list them vertically as we add functions
  addProduct,
  displayAddProduct,
  destroyProduct, 
  getProdDetail, 
  getAllProducts,
  searchProducts
} = require('../controllers/productCtrl.js');

router.post('/product', isLoggedIn, addProduct);
//get the product details for just one item
router.get('/product/add', displayAddProduct);
//sets the route to add a new product to sell
router.get('/product/:id', getProdDetail);
//sets route to delete product
router.get('/deleteProduct/:id/:user_id', destroyProduct);

router.get('/product', getAllProducts);
//searches through products relating to title search for in nav bar
router.get('/search', searchProducts);

//jm: this isloggedin prevents manually going to a route when not authenticated. call before route func to check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}

module.exports = router;
