// module de validation de string (et "sanitizers") ici utilisé pour la validation email
const emailSchema = require("validator");

/*possibilité de blacklister des carractères dans l'input mail graçe à validator
   pas utile ici car le front empeche déjà cela*/

module.exports = (req, res, next) => {
  //BLACKLISTER SI BESOIN, ici $ en exemple :
  /*req.body.email = emailSchema.blacklist(req.body.email, '/\$/');*/

  // logique validation email format controler par validator
  if (!emailSchema.isEmail(req.body.email)) {
    return res.status(400).json({
      error: "veuillez rentrer un email valide ! ex : marie@outlook.com",
    });
  } else {
    next();
  }
};
