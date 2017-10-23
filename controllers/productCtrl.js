'use strict'

module.exports.addProduct = (req, res, next) => {
  const { Product, User } = req.app.get('models'); 
  console.log('REQ', req.body);
  Product.create({
    title:req.body.title,
    description:req.body.description,
    user_id:passport.User.dataValues.id,
    price:req.body.price
  })
  .then( (data)=>{
    res.status(200).redirect('/welcome');
    })
    .catch( (err) => {
      res.status(200).json(err);
    })
};