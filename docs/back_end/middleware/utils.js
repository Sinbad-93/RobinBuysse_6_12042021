const crypto = require('crypto'); 
const algorithm = 'ares-192-cbc';
const password = 'blablalbalba';
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16,8);



exports.encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
   }
   
   exports.decrypt = (text) => {
       const decipher = crypto.createDecipheriv(algorithm, key, iv);
       let decrypted = decipher.update(text, 'hex', 'utf8');
       decrypted += decipher.final('utf8');
       return decrypted;
   }
/*----------------*/

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 
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