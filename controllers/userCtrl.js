'use strict';

module.exports.getOneUser = (req, res, next) => {
  const { User } = req.app.get('models'); 
  User.findAll({
    include: [{ all: true }],
    where: {id: req.params.id }
  })
  .then( (foundUser) => {
    let user = foundUser[0].dataValues;
    let userPmt = foundUser[0].dataValues.Payment_Types.map(function(each) {
      return each.dataValues;
    });
    let userOrders = foundUser[0].dataValues.Orders.map(function(each) {
      return each.dataValues;
    });
    res.render('userAcctSettings', {
      user,
      userPmt,
      userOrders
    })
  })
}; 

module.exports.updateUser = (req, res, next) => {
  const { User } = req.app.get('models'); 
  console.log("reqparamsID", req.params.id);
  console.log("user.id", req.user.id);
  User.update({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address
    }, {where:{id: req.user.id}
  })
  .then( function(returning){
    res.redirect(`/user/${req.user.id}`);
  })
  .catch( (err) => {
    next(err);
  })
};