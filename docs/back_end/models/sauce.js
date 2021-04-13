const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, /* identifiant MongoDB du créateur de la sauce*/
  name: { type: String, required: true },/*nom de la sauce*/
  manufacturer: {type: String, required: true},/*fabricant de la sauce*/
  description: { type: String, required: true },
  mainPepper: { type: String, required: true},/* ingrédient principal*/
  imageUrl: { type: String, required: true},
  heat: { type: Number, required: true },/*note de la sauce*/
  likes: { type: Number, required: true, default : 0 },/*nombres utilisateurs qui aiment*/
  dislikes: { type: Number, required: true, default : 0 },/*nombres utilisateurs qui n'aiment pas*/
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);