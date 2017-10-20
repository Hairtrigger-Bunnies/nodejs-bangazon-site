'use strict';
module.exports = (sequelize, DataTypes) => {
  var Payment_Type = sequelize.define('Payment_Type', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    account_number: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {timestamps: false});
  
  Payment_Type.associate = (models) => {
    Payment_Type.hasMany(models.Order, {
      foreignKey: 'payment_type_id'
    }); 
    Payment_Type.belongsTo(models.User, {
      foreignKey: 'payment_type_id'
    });
  };
  return Payment_Type;
};
