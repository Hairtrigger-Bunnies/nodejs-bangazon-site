'use strict'
const passport = require('passport');

module.exports.addProduct = (req, res, next) => {
	const { Product } = req.app.get('models');
	Product.create({
			title: req.body.title,
			description: req.body.description,
			//JM: this uid is being pulled from the updated 'user' var via git passport when isloggedin. same as req.passport.sessions.user
			user_id: req.user.id,
			price: req.body.price,
			quantity_avail: req.body.quantity_avail
		})
		.then((data) => {
			res.status(200).redirect(`/product/${data.dataValues.id}`);
		})
		.catch((err) => {
			res.status(200).json(err);
		})
};

// EXPORTS MODULE THAT BRINGS UP FORM TO ADD A NEW PRODUCT TO SELL- HITS productRoute
module.exports.displayAddProduct = (req, res, next) => {
  if (req.user) {
    res.render('new-product-form');  
  } else {
    return res.redirect('/');
  }
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
//Dr delete product
module.exports.destroyProduct = (req, res, next) => {
    const { Product } = req.app.get('models');
    Product.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then((data) => {
      res.redirect('/product/add');
    })
};
//jm get all prods
module.exports.getAllProducts = (req, res, next) => {
	const { Product } = req.app.get('models');
	Product.findAll({ order: ['id'] })
	.then( (Prods) => {
		Prods.reverse();
		res.render('allProducts', {	Prods	})
	})
	.catch( (err) => {
		next(err)
	})
};
