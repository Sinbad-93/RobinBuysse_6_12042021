const mongoose = require('mongoose');

// schema pour la base de donnée, controle IP et nb de tentative de connexion
const ipSchema = mongoose.Schema({
    userIp: { type : String, require: true},
    nbConnexionAttempt: { type:Number, required : true},
    date: {type: Array, require : true}
});

module.exports = mongoose.model('Ip', ipSchema);