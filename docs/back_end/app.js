const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/routes.js');
const userRoutes = require('./routes/users');
const path = require('path');

const app = express();
mongoose.connect('mongodb+srv://mongodb+srv://Sinbad:MongoDB2021sinbad@perso1712.fat9x.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;