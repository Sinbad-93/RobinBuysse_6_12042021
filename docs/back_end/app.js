const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/routes.js');
const userRoutes = require('./routes/users');
const path = require('path');

const app = express();
mongoose.connect('mongodb+srv://Sinbad:mhZ2lrmMVgn147S0@perso1712.fat9x.mongodb.net/<openC>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;