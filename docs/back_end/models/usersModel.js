const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// création du schema pour la base de donnée mongoDB
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  masquedInfo : { type: String, required: true },
  password: { type: String, required: true }
});

// validateur qui vérifie qu'il n'y a pas de doublons dans la base de donné
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);