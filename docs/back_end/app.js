const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/routes.js');

const app = express();
mongoose.connect('mongodb+srv://mongodb+srv://Sinbad:MongoDB21!@perso1712.fat9x.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('api/sauces', sauceRoutes);

module.exports = app;