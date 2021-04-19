const User = require('../models/usersModel');
const utils = require('../middleware/utils');

module.exports = async (req,res, next) => {
    const numberOfUsers = await User.countDocuments();
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
