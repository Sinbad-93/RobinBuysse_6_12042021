const express = require('express');
const router = express.Router();

const userCtrl = require('./controllers/usersCtrl');
"use strict"; /* <--- ? */

const verifyEmailAdress = require('../middleware/verifyEmailAdress');
const verifyPassword = require('../middleware/verifyPassword');
const blocAccessOnLoginFailed = require('../middleware/blocAccessOnLoginFailed');
const disableCaching = require('../middleware/disableCaching');

router.post('/signup', disableCaching, verifyEmailAdress, verifyPassword, userCtrl.signup);
router.post('/login', disableCaching, blocAccessOnLoginFailed, userCtrl.login);

module.exports = router;