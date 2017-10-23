'use strict'
const passport = require('passport');


module.exports.addProduct = (req, res, next) => {
  const { Product } = req.app.get('models'); 
  Product.create({
    title:req.body.title,
    description:req.body.description,
    //JM: this uid is being pulled from the updated 'user' var via passport when isloggedin. same as req.passport.sessions.user
    user_id:req.user.id,
    price:req.body.price,
    quantity_avail:req.body.quantity_avail
  })
  .then( (data)=>{
    res.status(200).redirect('/welcome');
    })
    .catch( (err) => {
      res.status(200).json(err);
    })
};

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