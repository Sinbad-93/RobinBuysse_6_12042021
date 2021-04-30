const express = require('express');
/* module express permettant la création de routes*/
const router = express.Router();
// initialiser les middlewaere et controllers
const userCtrl = require('./controllers/usersCtrl');
const verifyPassword = require('../middleware/verifyPassword');
const verifyEmail = require('../middleware/verifyEmail');

/* Routes utilisateurs de notre API, pour inscription et connexion */
//on verifie la validité de l'email et mdp à l'inscription avec deux middlewaere
router.post('/signup', verifyPassword, verifyEmail, userCtrl.signup);
/* on verifie le nombre de connexion d'affilés,
et si besoin on stop les tentatives avant la connexion*/
router.post('/login' , userCtrl.controlIp,userCtrl.stopConnection, userCtrl.login);
//RAPPEL les inputs seront controllés graçe a mongoSanitize et hemlet

module.exports = router;