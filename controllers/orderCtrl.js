'use strict';
let sequelize = require('sequelize');
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
}

module.exports.destroyProductFromOrder = (req, res, next) => {
  const { Product, Product_Order, Order } = req.app.get('models');
  let uid = req.user.id;
    // if (req.session.passport.user.id == req.params.user_id) {
      let param = req.params.id;
      Product.findById(param)
      .then( (prod) => {

        Order.findOne({ where: {payment_type_id: null, user_id: uid}})
        .then( (order) => {

          Product_Order.destroy({
            where: {
              product_id: prod.dataValues.id,
              order_id: order.dataValues.id
            }
          })

          .then( () => {
            res.redirect('/product');
          })

        })

      })
    
  //   } else {
  //    return res.redirect('/');
  // }
};

module.exports.destroyOrder = (req, res, next) => {
  const { Product, Product_Order, Order } = req.app.get('models');
  let uid = req.user.id;
  let param = req.params.id;
  Order.findById(param)
  .then( (order) => {

    Order.destroy({ where: {order_id: order.dataValues.id}})
    .then( () => {

      Product_Order.destroy({ where: {order_id: order.dataValues.id}})
      .then( (orderprods) => {
        Product_Order.destroy
      })

    })

  })
};


module.exports.getOpenOrder = (req, res, next) => {
  const { Product, Order } = req.app.get('models');
  Order.findAll({include: [{model: Product}], where: {payment_type_id: null, user_id: req.user.id}}) //include the Product so that it will go through the join table to get the products on that order
  .then( (openOrder) => {
    console.log("openOrder? On a newbie?", openOrder);
    if (!openOrder[0]) {
      //alert that your cart is empty, redirect to main/product page? TODO: this
      console.log("Your cart is empty!");
      req.flash('emptyCart',`Your cart is empty!`);
      res.redirect('/product');
    } else {
      let cart = openOrder[0].dataValues;
      let cartProducts = cart.Products.map(function(each){
        return each.dataValues;
      })
      res.render('open-order', {
        cart,
        cartProducts
      })
    }
  })
  .catch( (err) => {
    next(err);
  })
};
//need to count them somehow to show how many of each we have in cart! sequelize.count???
