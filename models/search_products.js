let SearchModel = require("pg-search-sequelize");
let models = require('../models');

module.exports = (sequelize, DataTypes) => {
  let ProductMaterializedView = sequelize.define('ProductMaterializedView', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    type_id: DataTypes.INTEGER,
    quantity_avail: DataTypes.INTEGER
  }, {
      referenceModel: models.Product // The model for which we're defining the materialized view
  });

  ProductMaterializedView = new SearchModel(ProductMaterializedView); // Adds search, searchByText, and refresh class methods to the model.
  return ProductMaterializedView;
};
