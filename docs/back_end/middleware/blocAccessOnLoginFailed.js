const Ip = require('../models/ip');

exports.ipControl = (req, res, next) => {
    Ip.findOne({ userIp: req.connection.remoteAddress })
      .then(ip => {
        if (!ip) {
          console.log('introuvable');
          const ip = new Ip({
            userIp: req.connection.remoteAddress,
            $inc: { nbConnexionAttempt: +1 },
            date : Date.now()
          });
          ip.save() 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
        }
        if (ip.nbConnexionAttempt > 4){ console.log('taux dépassé')}
            else { console.log('OK')}
            })
      .catch(error => res.status(500).json({ error }));
};