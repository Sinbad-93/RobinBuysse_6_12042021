const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/routes.js');
const userRoutes = require('./routes/users');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://Sinbad:mhZ2lrmMVgn147S0@perso1712.fat9x.mongodb.net/<openC>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
 })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

app.use((req, res, next) => {
  /* ressource partegeable depuis nimporte qu'elle origine*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* entete utilisé apres la pre verification cross-origin */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    /*n'autorise que ce serveur à fournir des scripts pour la page visité*/
    res.setHeader('Content-Security-policy', "default-src 'self'");
    /* methodes autorisés pour les requetes HTTP*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/* cookie en http only, sécurise pour empêcher d'être modifié par un tier*/
/*app.use(session({
  secret : "s3Cur3",
  cookie: {
    secure : true,
    httpOnly : true,
    domain: 'http://localhost:3000',
  }
}));*/

/* ou plutot ? app.use(express.json());*/
app.use(bodyParser.json());  
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;