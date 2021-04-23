const bcrypt = require('bcrypt');
const User = require('../../models/usersModel');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const utils = require('../../middleware/utils');
const ipAddress = require('../../models/ip');
// variables d'environnement
require('dotenv').config();
/* defini comment l'adresse sera masquée dans le champ emailMasked*/
const maskEmailOptions = {
  maskWith: '*',
  unmaskedStartCharacters: 3,
  unmaskedEndCharacters: 2,
  maskAtTheRate: false,
  maxMaskedCharactersBeforeAtTheRate : 10,
  maxMaskedCharactersAfterAtTheRate : 10

};

exports.signup = (req, res, next) => {
    console.log(req.body.email);
    bcrypt.hash(req.body.password, 10)/* saler le password 10 fois*/
      .then(hash => {
        const user = new User({
          email: MaskData.maskEmail2(req.body.email, maskEmailOptions),
          cryptedInfos : utils.encrypt(req.body.email),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

/*const userIP = require('user-ip');*/
var today = new Date();
console.log(today.toString())
console.log(today.getHours())
console.log(today.getMinutes())
console.log(today.getDate())
console.log(today.getMonth())
console.log(today.getFullYear())
var day =  [today.getDate()+today.getMonth()+today.getFullYear(),today.getHours()+today.getMinutes()]
var repere = 0;

exports.login = (req, res, next) => {
    User.findOne({ email : MaskData.maskEmail2(req.body.email, maskEmailOptions) })
      .then(user => {
        if (!user) {
          console.log('introuvable');
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        const showInfos = utils.decrypt(user.cryptedInfos);
        console.log('RECUPERATION DES INFORMATIONS CRYPTES : ' + showInfos);
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              console.log('Mot de passe incorrect !');
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              /*transformer l'id user en token avec une expiration*/
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.controlIp = (req, res, next) => {
    /*l'adresse ip ne fonctionne pas en localhost
  const ip = userIP(req);console.log('Adresse Ip : ' + ip);*/
  var falseIp = 'ip127.0.2021'+req.body.email
  ipAddress.findOne({userIp : falseIp})
  .then(ip_address => { 
    if (!ip_address){
    console.log('nouvelle adresse ip');
    const ip_address = new ipAddress({
      userIp: falseIp,
      nbConnexionAttempt : 0,
      date: day
    });
    ip_address.save()
      .then(() => res.status(201).json({ message: 'addresse ip enregistrée !' }))
      .catch(error => res.status(400).json({ error }));
        }
    else {
      repere = 1;
      console.log('repère');
     
    exports.stopConnection = (req,res, next) => {
      if ((ip_address.nbConnexionAttempt > 4) 
      && (ip_address.date[0] === today.getDate()+today.getMonth()+today.getFullYear())){
        console.log('CONNEXION NON AUTORISEE')
      }}})
      .then(() => res.status(200).json({ message: "tentative de connexion +1" }))
      .catch((error) => res.status(400).json({ error }));
  if(repere === 1){
    ip_Address.updateOne({userIp : falseIp},
    {
     $inc: { nbConnexionAttempt: +1 },
   })}
    }