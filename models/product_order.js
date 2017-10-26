'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_Order = sequelize.define('Product_Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
    // order_id: DataTypes.INTEGER,
    // product_id: DataTypes.INTEGER
  }, {timestamps:false});

  // Product_Order.associate = (models) => {
  //       Product_Order.belongsTo(models.Order, {
  //         foreignKey:'order_id'
  //       });

  //       Product_Order.belongsTo(models.Product, {
  //         foreignKey:'product_id'          
  //       });
  //     }
  return Product_Order;
};