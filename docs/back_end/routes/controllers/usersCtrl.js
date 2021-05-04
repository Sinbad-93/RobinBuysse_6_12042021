/* packages */
// permet de crypter le mdp*/
const bcrypt = require("bcrypt");
// permet de creer un token de connexion
const jwt = require("jsonwebtoken");
// permet de masquer des informations dans la base de donnée
const MaskData = require("maskdata");
// chemin de fichiers
const User = require("../../models/usersModel");

const crypto = require("../../middleware/crypto");

const ipAddress = require("../../models/ip");
// variables d'environnement
require("dotenv").config();
/* defini comment l'adresse sera masquée dans le champ emailMasked*/
const maskEmailOptions = {
  maskWith: "*",
  unmaskedStartCharacters: 3,
  unmaskedEndCharacters: 2,
  maskAtTheRate: false,
  maxMaskedCharactersBeforeAtTheRate: 10,
  maxMaskedCharactersAfterAtTheRate: 10,
};

// controller pour l'inscription
exports.signup = (req, res, next) => {
  //console.log(req.body.email);
  bcrypt
    .hash(req.body.password, 10) /* saler le password 10 fois*/
    .then((hash) => {
      /* notre utilisateur provient du model UsersModel, 
        si le format n'est pas respecté il y aura une erreur,
        si l'email existe dejà dans la base de donnée on aura une erreur graçe à uniqueValidator */
      const user = new User({
        // crypter email pour qu'il soit illisbile base donnée l'email
        email: crypto.encrypt(req.body.email),
        // masquer une donnée pour qu'elle soit partiellement illisbile
        masquedInfo: MaskData.maskEmail2(req.body.email, maskEmailOptions),
        // crypt + hash mdp
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // crypter l'email
  const userCrypt = crypto.encrypt(req.body.email);
  console.log(crypto.decrypt(userCrypt));
  // On compare l'email crypté de la requete avec celui de mongo DB
  User.findOne({ email: userCrypt })
    .then((user) => {
      if (!user) {
        console.log("introuvable");
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // récupération d'informations masqués, par exemple pour afficher sur la page profil
      const showInfos = user.masquedInfo;
      console.log("RECUPERATION DES INFORMATIONS MASQUES : " + showInfos);
      // vérifier le mdp
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log("Mot de passe incorrect !");
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            //si la connexion est réussie transformer l'id user en token avec une expiration
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "1h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/* ci dessous module permettant de récupérer l'adresse ip, ici on ne peut pas l'utiliser 
en localhost, on va donc simuler le travail sur l'ip en utilisant l'adresse mail*/
// const userIP = require('user-ip');

// date du jour
var today = new Date();
/*console.log(today.toString() ,today.getHours(),today.getMinutes(),
today.getDate(), today.getMonth(), today.getFullYear())*/

// mettre les informations dans une array
var day = [
  today.getDate(),
  today.getMonth(),
  today.getFullYear(),
  today.getHours(),
  today.getMinutes(),
];
// compteur d'essai de connexion
var reinitializeCount = 0;

exports.controlIp = (req, res, next) => {
  today = new Date();
  /*l'adresse ip ne fonctionne pas en localhost, 
  const ip = userIP(req);
  console.log('Adresse Ip : ' + ip);*/
  // on va donc simuler une ip avec le mail de connexion
  var falseIp = "ip127.0.2021" + req.body.email;
  // on cherche, si n'exsite pas la créer
  ipAddress
    .findOne({ userIp: falseIp })
    .then((ip_address) => {
      if (!ip_address) {
        console.log("nouvelle adresse ip");
        const ip_address = new ipAddress({
          userIp: falseIp,
          nbConnexionAttempt: 0,
          date: day,
        });
        ip_address.save();
        console.log("addresse ip enregistrée !");
      } else {
        //si existante, vérifier quelle est l'occurence de tentative de connexion
        console.log(
          "tentative de connexion numéro " +
            (ip_address.nbConnexionAttempt + 1) +
            "/5"
        );
        // si supérier à 5, aujourd'hui, en moins de 5 min -> bloquer
        if (ip_address.nbConnexionAttempt + 1 > 5) {
          if (
            ip_address.date[0] === today.getDate() &&
            ip_address.date[1] === today.getMonth() &&
            ip_address.date[2] === today.getFullYear()
          ) {
            console.log(
              "date du jour : " + ip_address.date[0],
              ip_address.date[1],
              ip_address.date[2]
            );
            if (
              ip_address.date[3] === today.getHours() &&
              ip_address.date[4] + 5 > today.getMinutes()
            ) {
              console.log("connexion non autorisée");
              console.log(
                "Nombre de tentatives connexions maximum dépassées, veuillez attendre 5min"
              );
              // stopper le code, donc empecher connexion
              return res.status(400).json({
                error: "Nombre de tentatives connexions maximum dépassées",
              });
              //plus de 5 min, remettre compteur à zéro
            } else {
              console.log("reinitialisation temps attendu 5 min ");
              console.log(today.getHours() + today.getMinutes());
                (reinitializeCount = 1);
            }
            // un autre jour, remettre compteur à zéro
          } else {
            console.log("reinitialisation jour passé"), (reinitializeCount = 1);
          }
        }
      }
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};

// ajouter +1 au compteur, ou réinitialiser les essais grâce à la variable reinitializeCount
exports.stopConnection = (req, res, next) => {
  var falseIp = "ip127.0.2021" + req.body.email;
  if (reinitializeCount === 0) {
    ipAddress
      .updateOne(
        { userIp: falseIp },
        {
          $inc: { nbConnexionAttempt: +1 },
          date: day,
        }
      )
      .catch((error) => res.status(400).json({ error }));
  } else if (reinitializeCount === 1) {
    console.log("reinitialisation des essais");
    reinitializeCount = 0;
    ipAddress
      .updateOne(
        { userIp: falseIp },
        {
          nbConnexionAttempt: 0,
        }
      )
      .catch((error) => res.status(400).json({ error }));
  }

  next();
};

// TEST
const testDudecryptage = crypto.encrypt("testdudecryptage@exemple.fr");
console.log(crypto.decrypt(testDudecryptage));
