/* initialiser les packages et connecter les fichiers*/
// module express
const express = require("express");
// mongodb et schemas
const mongoose = require("mongoose");
// fichiers pour nos routes
const sauceRoutes = require("./routes/routes.js");
const userRoutes = require("./routes/users");
// module intégré, utilisé ici pour accéder à /images
const path = require("path");

// permet de lire le format JSON, pas nécéssaire, maintenant integré avec express
// const bodyParser = require('body-parser');

// création de l'app express
const app = express();
// variables d'environnement
require("dotenv").config();
// module express permettant de sécuriser les cookies et de creer des noms de cookies uniques
var session = require("express-session");

// permet d'empecher les failles no SQL
const mongoSanitize = require("express-mongo-sanitize");

// package avec plusieurs dependances de protection
const helmet = require("helmet");
/*app.use(helmet());*/
// ...is equivalent to this:

/*définit l’en-tête Content-Security-Policy pour la protection 
contre les attaques de type cross-site scripting et autres injections intersites.*/
app.use(helmet.contentSecurityPolicy());
/*helmet.dnsPrefetchControl définit l'en-tête X-DNS-Prefetch-Control
pour contrôler la prélecture DNS, pour améliorer la confidentialité des utilisateurs */
app.use(helmet.dnsPrefetchControl());
//helmet.expectCt qui aide à atténuer défauts d'emission des certificats SSL.
app.use(helmet.expectCt());
// définit l’en-tête X-Frame-Options pour fournir une protection clickjacking.
app.use(helmet.frameguard());

//supprime l’en-tête X-Powered-By. (PHP)
//app.use(helmet.hidePoweredBy());

/* définit l’en-tête Strict-Transport-Security qui 
impose des connexions (HTTP sur SSL/TLS) sécurisées au serveur.*/
app.use(helmet.hsts());
//définit X-Download-Options pour IE8+
app.use(helmet.ieNoOpen());
/*définit X-Content-Type-Options pour protéger les navigateurs 
du reniflage du code MIME (Multipurpose Internet Mail Extensions ).*/
app.use(helmet.noSniff());
/*helmet.permittedCrossDomainPolicies sets the X-Permitted-Cross-Domain-Policies 
header, indique à certains clients (principalement des produits Adobe)
la politique de votre domaine pour le chargement de contenu interdomaine */
app.use(helmet.permittedCrossDomainPolicies());
/*helmet.referrerPolicy sets the Referrer-Policy header 
qui contrôle quelles informations sont définies dans l'en-tête Referer.*/
app.use(helmet.referrerPolicy());
// empeche les failles xss
app.use(helmet.xssFilter());

mongoose
  .connect(process.env.MONGOGUEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

// filter les origines
const allowOrigins = ["http://app.exemple.com", "http://autre.exemple.com"];
// ici on accepte toutes origines
const allOrigins = "*";

app.use((req, res, next) => {
  if (allOrigins) {
    res.setHeader("Access-Control-Allow-Origin", allOrigins);
  }
  // On test si l'entête "Origin" fait partie des origines acceptées
  else if (
    res.setHeader["origin"] &&
    allowOrigins.includes(res.setHeader["origin"])
  ) {
    /*Si oui alors on renseigne "Access-Control-Allow-Origin" 
        avec l'origine de la requête */
    res.setHeader("Access-Control-Allow-Origin", res.setHeader["origin"]);
  } else {
    /* Sinon on renseigne "Access-Control-Allow-Origin" à null 
        créant une erreur CORS dans le navigateur*/
    res.setHeader("Access-Control-Allow-Origin", "null");
  }
  /* ressource partegeable depuis nimporte qu'elle origine
    res.setHeader('Access-Control-Allow-Origin', '*');*/
  /* entete utilisé apres la pre verification cross-origin */
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  /*n'autorise que ce serveur à fournir des scripts pour la page visité*/
  res.setHeader("Content-Security-policy", "default-src 'self'");
  /* methodes autorisés pour les requetes HTTP*/
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// configure cookie, in particular http only
app.set("trust proxy", 1); // trust first proxy for express session
app.use(
  session({
    name: "Session456587",
    cookieName: "sessionName",
    secret: "s3Cur3COOK1E",
    resave: false,
    saveUninitialized: true,
    httpOnly: true, // dont let browser javascript access cookie ever
    secure: true, // only use cookie over https
    domain: "http://localhost:3000",
    ephemeral: true, // delete this cookie while browser close
  })
);

app.use(express.json());
// To remove suspected xss data, use:
app.use(mongoSanitize());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
