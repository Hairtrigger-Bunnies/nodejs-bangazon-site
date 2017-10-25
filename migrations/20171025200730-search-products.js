'use strict';

const QueryInterface = require("pg-search-sequelize").QueryInterface;
const models = require("../models");

// The model we're creating the materialized view for
const referenceModel = models.Product;

const materializedViewName = "product_materialized_view";

const attributes = { // field: weight. Every field has a weight to calculate how relevant the search results are.
   title: "A", // name has the highest weight. 
   description: "B"
}

const options = {
  include: [ // You can also include fields from associated models
    {
      model: models.User,
      foreignKey: "user_id",
      targetKey: "id",
      associationType: "belongsTo", // association types are: belongsTo, hasOne, or hasMany
      attributes: { // Those attributes get added to the materialized view's search document and will also be searched just like the other fields
        first_name: "C",
        last_name: "C",
        user_name: "C"
      }
    }
  ]
};

module.exports = {
    up: queryInterface => new QueryInterface(queryInterface).createMaterializedView(materializedViewName, referenceModel, attributes, options),
    
    down: queryInterface => new QueryInterface(queryInterface).dropMaterializedView(materializedViewName)
}
