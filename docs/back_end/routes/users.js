const express = require('express');
const router = express.Router();

const userCtrl = require('./controllers/usersCtrl');
const verifyPassword = require('../middleware/verifyPassword');
const verifyEmail = require('../middleware/verifyEmail');


router.post('/signup', verifyPassword, verifyEmail, userCtrl.signup);
router.post('/login' , userCtrl.controlIp,userCtrl.stopConnection, userCtrl.login);

module.exports = router;