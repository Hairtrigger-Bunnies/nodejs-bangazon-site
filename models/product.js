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
  
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Product.belongsToMany(models.Order, {
      through: {
        model: 'Product_Order',
        unique: false
      },
      foreignKey: 'product_id',
      constraints: false
    });
  }
  return Product;
}; 