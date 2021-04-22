const bcrypt = require('bcrypt');
const User = require('../../models/usersModel');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
// variables d'environnement
require('dotenv').config()
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
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
    User.findOne({ email : MaskData.maskEmail2(req.body.email, maskEmailOptions) })
      .then(user => {
        if (!user) {
          console.log('introuvable');
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              /*transformer l'id user en token avec une expiration*/
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };