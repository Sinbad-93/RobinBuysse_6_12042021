const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
/* GESTION DU TOKEN : authentification obligatoire à chaque requete de l'api sauce*/
module.exports = (req, res, next) => {
  try {
    // récuperer le token dans la req
    const token = req.headers.authorization.split(" ")[1];
    //comparer le token client avec le token de base
    const decodedToken = jwt.verify(token, SECRET_KEY);
    /*console.log(decodedToken);*/
    //userId est par defaut dans la req
    const userId = decodedToken.userId;
    /*console.log(userId);*/
    // bloquer la requete si le token ne correspond pas
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
