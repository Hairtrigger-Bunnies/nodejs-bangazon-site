const {Users} = require('./users.json');
const {Orders} = require('./orders.json');
const {Products} = require('./products.json');
const {Payment_Types} = require('./payment_types.json');
const {Order_Products} = require('./order_products.json');
let sequelize = require('sequelize');
let queryInterface = require('sequelize/lib/query-interface');

let rollDB = (queryInterface) => {
    const app = require('../app');
    const models = app.get('models');
    const server = require('../app');
    return models.sequelize.sync({force: true})
    .then( (queryInterface) => {
        return models.User.bulkCreate(Users);
    })
    .then( () => {
        return models.Payment_Type.bulkCreate(Payment_Types);
    })
    .then( () => {
        return models.Product.bulkCreate(Products);
    })
    .then( () => {
        return models.Order.bulkCreate(Orders);
    })
    // .then( () => {
    //     return models.Product_Order.bulkCreate(Product_Orders);
    // })
    .catch( (err)=> {
        console.log("ERRRR", err);
    })
};

rollDB(queryInterface);

module.exports = rollDB;