# RobinBuysse_6_12042021
Faire fonctionner le projet en local :

open first terminal : 
cd docs/front_end
npm install
npm i node-sass@4.14.1
ng serve
(wait few minuts, compilation need time)

open second terminal : 
cd docs/back_end
npm install
node server //ou nodemon server

Configurer l'environnement :
creer un fichier .env et ajouter les informations :
PORT=*3000*
CRYPTO=*creer une clef secrete*
SECRET_KEY =*creer une clef secrete*
AUTH=true
MONGOGUEST=*chemin mongo db*

