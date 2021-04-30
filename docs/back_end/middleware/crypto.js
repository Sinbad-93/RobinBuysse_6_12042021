require("dotenv").config();
// module crypto intégré à Node.js
const crypto = require("crypto");

//algorithm pré-défnini
const algorithm = "aes-192-cbc";
// Clef secrète définié dans .env
const envPass = process.env.CRYPTO;
// salage de la clef
/*The key length is dependent on the algorithm.
 In this case for aes192, it is 24 bytes (192 bits).*/
const key = crypto.scryptSync(envPass, "salt", 24);

//initialization vector
//Crée un tampon de longueur 10, rempli d'octets qui ont tous la valeur «8».
const iv = Buffer.alloc(16, 8);

// logique de chiffrage avec les configurations détérminés précédement
exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // a cipher (or cypher) is an algorithm for performing encryption or decryption
  // cipher = chiffrer
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// logique de déchiffrage
exports.decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(hash, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
