'use strict';

module.exports.getOneUser = (req, res, next) => {
  const { User } = req.app.get('models'); 
  User.findAll({
    include: [{
      all: true
    }],
    where: {id: req.params.id }
  })
};