'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER
  },  {timestamps: false});
  
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Product.belongsToMany(models.Order, {
      through: 'Product_Order',
      foreignKey: 'order_id'
    });
  }
  return Product;
};