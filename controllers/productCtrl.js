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
      console.log("req", req.user.id);
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
    console.log("id", req.session.passport.user.id, req.params.user_id)
      if (req.session.passport.user.id == req.params.user_id) {
        Product.destroy({
            where: {
              id: req.params.id,
            }
          })
          .then((data) => {
            res.redirect('/product');
          })
     } else {
       return res.send("You Don't Have Permission To Delete This Item");
    }
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

//bs/DR- get product related to search results
module.exports.searchProducts = (req, res, next) => {
  const { Product } = req.app.get('models');
  if (req.user) {
    Product.findAll({
     raw: true,
      where: {
        title: {
          $iLike: `%${req.query.title}%`
        }
      }
    })
    .then( (products) => {     
      console.log('Product', products);
      res.render('search-products', { products })
    })
    .catch( (err) => {
      next(err)
    })
  } else {
    return res.redirect('/');
  };
};

