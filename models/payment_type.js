'use strict';

//exports an anonymous function and expects sequelize and DataTypes to be passed in
module.exports = (sequelize, DataTypes) => {
  // defines payment type to have the properties id, name, account number, and user id
  var Payment_Type = sequelize.define('Payment_Type', {
    name: DataTypes.STRING,
    account_number: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {timestamps: false});
  
  // associates payment type with order and user since payment type has many and belongs to orders and users
  Payment_Type.associate = (models) => {
    Payment_Type.hasMany(models.Order, {
      foreignKey: 'payment_type_id'
    }); 
    Payment_Type.belongsTo(models.User, {
      foreignKey: 'payment_type_id'
    });
  };
  //returns payment type so it can run when called on the page
  return Payment_Type;
};
