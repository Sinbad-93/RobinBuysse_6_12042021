const User = require('../models/usersModelPlus');
const utils = require('../middleware/utils');
"use strict";

/* vérifier que l'adresse email n'est pas déjà existante dans la base de donnée */
module.exports = async (req,res, next) => {
    const numberOfUsers = await User.countDocument();
    if (numberOfUsers === 0) {
        next();
    } else {
        const users = await User.find();
        const user = users.reduce( (acc, user) => {
            const emailDecrypted = utils.decrypt(user.email);
            if (emailDecrypted === req.body.email) {
            acc = user}
            return acc;
        }, null);
        if (user){
            return res.status(400).json({error : 'Email déjà utilisé'});
         } else {
                next();
            }
        }
    }
