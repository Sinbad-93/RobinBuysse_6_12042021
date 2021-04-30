// modèle créé avec le module password-validator, password.js
const passwordSchema = require("../models/password");

/*vérifie que le mot de passe respecte le schéma de sécurité*/
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      //si mot de passe non conforme revoie une erreur + la liste des restrictions demandées.
      error:
        "Mot de passe non sécurisé" +
        passwordSchema.validate(req.body.password, { list: true }),
    });
  } else {
    next();
  }
};
