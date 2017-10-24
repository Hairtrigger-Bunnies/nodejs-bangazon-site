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
    res.render('userAcctSettings', {
      user
    })
  })
};