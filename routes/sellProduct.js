'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/productCtrl');

router.get('/sellProduct', isLoggedIn, )


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}

module.exports = router;
