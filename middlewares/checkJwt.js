const jwt = require('jsonwebtoken');

require ('dotenv').config();

const checkJwt = (req, res, next)=> {
    // si la requête authorization ne correspond pas (pass de token) alors renvoi un message d'erreur
    if(!req.headers.authorization) {
        res.status(401).json();
    };
    // sinon verifie la validité de mon token. 
    // si c'est ok tu peux passer à la prochaine fonction sinon 
    // indique un message d'erreur
    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (err) {
      return res.status(401).json();
    }
};

module.exports = checkJwt;