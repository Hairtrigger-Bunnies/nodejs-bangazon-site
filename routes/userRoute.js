'use strict';

const { Router } = require('express');
const router = Router();

const {
    getOneUser,
    updateUser
  } = require('../controllers/userCtrl.js');

router.get('/user/:id', isLoggedIn, getOneUser);
router.put('/user/:id', isLoggedIn, updateUser);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
  }

module.exports = router;
  