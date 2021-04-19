const jwt = require('jsonwebtoken');
/* GESTION DU TOKEN */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    /*lorsque décodé object avec l'id de l'user, date de debut et fin*/
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    /*console.log(decodedToken);*/
    const userId = decodedToken.userId;
    /*console.log(userId);*/
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};