const mongoose = require('mongoose');

const ipSchema = mongoose.Schema({
    userIp: { type : String, require: true},
    nbConnexionAttempt: { type:Number, required : true},
    date: {type: Array, require : true}
});

module.exports = mongoose.model('Ip', ipSchema);