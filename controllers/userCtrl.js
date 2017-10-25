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

//This only updates the four fields named --user cannot update purchase history, and the payment types add/delete will be a separate function. -el
module.exports.updateUser = (req, res, next) => {
  const { User } = req.app.get('models'); 
  User.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    address: req.body.address
    }, {where:{id: req.user.id}
  })
  .then( function(returning){
    res.redirect(`/user/${req.user.id}`); //show the updated user
  })
  .catch( (err) => {
    next(err);
  })
};