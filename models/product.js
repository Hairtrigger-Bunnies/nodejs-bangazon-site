'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    type_id: DataTypes.INTEGER,
    quantity_avail: DataTypes.INTEGER
  },  {timestamps: false});
  
  let SearchModel = require('pg-search-sequelize');
  Product = new SearchModel(Product);

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Product.belongsTo(models.Product_Order, {
      foreignKey: 'product_id'
    });
  }
  return Product;
};