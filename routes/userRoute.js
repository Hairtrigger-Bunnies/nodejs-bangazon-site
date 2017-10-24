'use strict';

const { Router } = require('express');
const router = Router();

const {
    getOneUser
  } = require('../controllers/userCtrl.js');

router.get('/user/:id', isLoggedIn, getOneUser)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
  }

module.exports = router;
  