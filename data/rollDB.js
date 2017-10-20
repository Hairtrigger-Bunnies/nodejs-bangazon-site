const {Users} = require('./users.json');
let sequelize = require('sequelize');
let queryInterface = require('sequelize');

let rollDB = () => {
    const app = require('../app');
    const models = app.get('models');
    const server = require('../app');
    // return models.sequelize.sync({force: true})
    // .then( () => {
    //     queryInterface.bulkInsert('Users', Users, {});
    // })
};

rollDB();

module.exports = rollDB;