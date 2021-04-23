const emailSchema = require("validator");
const utils = require('../middleware/utils');
// logique validation email
/*console.log(emailSchema.blacklist('gg66@gg.com', '/6/'));*/

module.exports = (req, res, next) => {
  /*possibilité de blacklister des carractères*/
  /*req.body.email = emailSchema.blacklist(req.body.email, '/6/');*/
  if (!emailSchema.isEmail(req.body.email)) {
    return res.status(400).json({
      error: "veuillez rentrer un email valide ! ex : marie@outlook.com",
    });
  } else {
    next();
  }
};