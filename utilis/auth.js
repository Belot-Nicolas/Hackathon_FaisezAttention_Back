const jwt = require('jsonwebtoken');
require('dotenv').config();

//pour associer mon token à mon utilisateur (on ne met pas le password, sinon on pourrait y accéder via la console par exemple)
//on demande à la librairie de signer : email (et son role: si on l'indique 

const generateJwt = (email) => jwt.sign({
    email
    //je rattache ma clé secret.
},process.env.JWT_SECRET);

module.exports = {
    generateJwt
};