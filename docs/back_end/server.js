/* initialiser le serveur*/
var http = require("http");

// pour https voir bas de page

/* séparer la logique avec un fichier app pour express*/
const app = require("./app");

/*gestion du port d'écoute avec parseInt 
pour traduire chaine carrac en int*/
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// par defaut le port notifié dans .env, sinon 3000
const port = normalizePort(process.env.PORT || "3000");

// nommer paramètre
app.set("port", port);

/* gestion des erreurs */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* creation du serveur avec express*/
const server = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

/*écouteur d'erreur et d'evenement*/
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
/* connexion du serveur */
server.listen(port);

//httpsServer.listen(8443);

//-------------------------------------------------
/* creation de certificat SSL nécéssite de creer un certificat et une clef,
certains hébérgeur propose le https comme add-on gratuit (autre moyen de faire) */
/*var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};*/
