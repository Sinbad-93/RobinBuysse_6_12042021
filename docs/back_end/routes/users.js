const express = require('express');
const router = express.Router();

const userCtrl = require('./controllers/usersCtrl');

const verifyPassword = require('../middleware/verifyPassword');
const blocAccessOnLoginFailed = require('../middleware/blocAccessOnLoginFailed');
const disableCaching = require('../middleware/disableCaching');
const verifyEmail = require('../middleware/verifyEmail');


router.post('/signup', verifyPassword, verifyEmail, userCtrl.signup);
router.post('/login' , userCtrl.login);
/*
router.post('/signup', disableCaching, verifyEmailAdress, verifyPassword, userCtrl.signup);
router.post('/login', disableCaching, blocAccessOnLoginFailed, userCtrl.login);
*/
module.exports = router;