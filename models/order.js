'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    order_date: DataTypes.STRING,
    payment_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {timestamps:false});
  

  Order.associate = (models) => {
    Order.belongsToMany(models.Product, { 
      through: {
        model: 'Product_Order',
        unique: false
      },
      foreignKey: 'order_id',
      constraints: false
    });

    Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    });

    Order.belongsTo(models.Payment_Type, {
      foreignKey: 'payment_type_id'
    });
  } 

  return Order;
};