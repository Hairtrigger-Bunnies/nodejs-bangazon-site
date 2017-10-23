'use strict';
const passport = require('passport');

// EXPORTS MODULE THAT BRINGS UP FORM TO ADD A NEW PRODUCT TO SELL- HITS productRoute
module.exports.displayAddProduct = (req, res, nect) => {
  res.render('new-product-form');
};

//get one product's details to PUG to the dom(-el)
module.exports.getProdDetail = (req, res, next) => {
    const { Product } = req.app.get('models');
    let prodId = req.params.id;
    Product.findById(prodId)
    .then( (foundProd) => {
        let singleProd = foundProd.dataValues;
        res.render('singleProdDetail', { //pass in the info the PUG will need to render this info
            singleProd
        })
    })
    .catch( (err) => {
        next(err)
    })
};
