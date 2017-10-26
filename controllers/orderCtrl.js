'use strict';
// let sequelize = require('sequelize');
//jm: this func first checks if user has an existing order or not, creates order if needed, then adds product to prodorder
module.exports.checkMakeOrder = (req, res, next) => {
	const { Product, Order, Product_Order } = req.app.get('models');
  let uid = req.user.id;
  let currentDate = new Date().toISOString();
  //first looks to find if user has current order without paytypeid on it
  Order.findOne({ where: {payment_type_id: null, user_id: uid}})
  .then( (order) => {
    if (order) {
      //finds the id of the selected prod
      let param = req.params.id;
      Product.findById(param)
      .then( (prod) => {
        //take the order and product data to insert into prodorder table
        Product_Order.create({
          order_id:order.dataValues.id,
          product_id:prod.dataValues.id
        })
      })
      .catch( (err) => {
        res.status(200).json(err);
      })
    } else {
      //if user has no order already, make one
      Order.create({
        order_date:currentDate,
        payment_type_id:null,
        user_id:req.user.id
      })
      .then( (neworder) => {
        //findin id of prod
        let param = req.params.id;
        Product.findById(param)
        .then( (prod) => {
          //take the order and product data to insert into prodorder table          
          Product_Order.create({
            order_id:neworder.dataValues.id,
            product_id:prod.dataValues.id
          })
        })
      })
      .then( () => {
        res.status(200).redirect(`/product/`);
      })
      .catch( (err) => {
        res.status(200).json(err);
      })
    }
  })
};


module.exports.getOpenOrder = (req, res, next) => {
  const { Product, Order, sequelize } = req.app.get('models');
  Order.findAll({include: [{model: Product}], where: {payment_type_id: null, user_id: req.user.id}}) //include the Product so that it will go through the join table to get the products on that order
  .then( (openOrder) => {
    // console.log("openOrder??", openOrder);
    if (!openOrder) {
      //alert that your cart is empty, redirect to main/product page? TODO: this
      console.log("Your cart is empty!");
      req.flash('emptyCart',`Your cart is empty!`);
      res.redirect('/product');
    } else {
      req.cart = openOrder[0].dataValues;
      req.cartProducts = req.cart.Products.map(function(each){
        return each.dataValues;
      })
      req.order_id = req.cart.id;
      return next();
    }
  })
  .catch( (err) => {
    next(err);
  })
};

//need to count them somehow to show how many of each we have in cart! sequelize.count???
//finAndCountAll returns that I have 6 rows, but now how many of each product id
module.exports.countEachProdOnOrder = (req, res, next) => {
  let cart = req.cart;
  let cartProducts = req.cartProducts;
  let { sequelize } = req.app.get('models');
  sequelize.query(`SELECT product_id, COUNT(*) FROM "Product_Orders" WHERE order_id=${req.order_id} GROUP BY product_id`, { type: sequelize.QueryTypes.SELECT})
  .then( (results) => {
    for (let i=0; i<cartProducts.length; i++) {
      results.forEach( (resultObj => {
        if (resultObj.product_id === cartProducts[i].id) {
          cartProducts[i].quantityInCart = resultObj.count;
        }
      }))
    }
    console.log("cart", cart);
    console.log("cartProducts", cartProducts);
    res.render('open-order', {
      cart,
      cartProducts
    });
  })
};