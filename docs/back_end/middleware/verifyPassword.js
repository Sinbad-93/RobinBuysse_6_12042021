const passwordSchema = require('../models/Password');
"use strict";

/*vérifie que le mot de passe respecte le schéma*/
module.exports = (req, res, next) => { 
 if (!passwordSchema.validate(req.body.password)){
     return res.status(400).json({
        error : 'Mot de passe non sécurisé' + 
        passwordSchema.validate(req.body.password, { list : true})
        });
    }
 else {
            next();
        } 
 };