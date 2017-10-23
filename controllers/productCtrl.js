'use strict';
const passport = require('passport');

module.exports.sellProduct = (req, res, nect) => {
  console.log('test', req.body);
  const { Products } = req.app.get('models');
  Products.create({
    title:req.body.title,
    description:req.body.description,
    quantity_avail:req.body.quantity_avail,
    price:req.body.price
  })
  .then( (data) => {
    res.status(200).redirect('')
  })
}

//JT - This function brings up the add new employee form on the web browser
//JT -This function gets called from the /add-new-employee route
// module.exports.renderEmployeePage = (req, res, next) => {
//   const { Departments } = req.app.get('models');
//   Departments.findAll() // love those built-in Sequelize methods
//   .then( (department) => {
//     res.render('create_employee', {department});
//   })
//   .catch( (err) => {
//     next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
//   });
// };