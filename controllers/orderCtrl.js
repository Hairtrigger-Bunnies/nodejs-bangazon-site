'use strict';

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
  const { Product, Order, Product_Order } = req.app.get('models');
  Order.findOne({ where: {payment_type_id: null, user_id: uid}})
  .then( (openOrder) => {
    if (!openOrder) {
      //alert that your cart is empty, redirect to main/product page?
    } else {
      res.render('open-order', {
        openOrder
      })
    }
  })
};
