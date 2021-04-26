/* module de cryptage decryptage basé sur une chaine de carractere (algo)*/
const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR);

/* encrypter et decrypter les informations pour qu'elle soient accessible 
sur le compte client si besoin mais illisible sur la base de donné */
exports.encrypt = (text) => {
    const encryptedString = cryptr.encrypt(text);
    console.log('ENCRYPT : ' + encryptedString);
 return encryptedString;
}

exports.decrypt = (text) => {
    const decryptedString = cryptr.decrypt(text);
    console.log('DECRYPT : ' + decryptedString);
    return decryptedString;
}