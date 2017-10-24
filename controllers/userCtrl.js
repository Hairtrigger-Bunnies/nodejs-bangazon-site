'use strict';

module.exports.getOneUser = (req, res, next) => {
  const { User } = req.app.get('models'); 
  User.findAll({
    include: [{ all: true }],
    where: {id: req.params.id }
  })
  .then( (foundUser) => {
    let user = foundUser[0].dataValues;
    console.log("USER", user);
    // let bigUserPmt = foundUser[0].dataValues.Payment_Types;
    let userPmt = foundUser[0].dataValues.Payment_Types.map(function(each) {
      return each.dataValues;
    });
    let userOrders = foundUser[0].dataValues.Orders.map(function(each) {
      return each.dataValues;
    });
    console.log("User's orders?", userOrders);
    res.render('userAcctSettings', {
      user,
      userPmt,
      userOrders
    })
  })
};