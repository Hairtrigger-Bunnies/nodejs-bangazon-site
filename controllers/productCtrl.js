'use strict';


//get one product to PUG to the dom(el)
module.exports.getProdDetail = (req, res, next) => {
    const { Product } = req.app.get('models');
    let prodId = req.params.id;
    console.log("reqparamsid", prodId);
    Product.findById(prodId)
    .then( (foundProd) => {
        let singleProd = foundProd.dataValues;
        res.render('singleProdDetail', {
            singleProd
        })
    })
};