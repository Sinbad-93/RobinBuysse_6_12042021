const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR);

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