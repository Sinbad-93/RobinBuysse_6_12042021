const passwordValidator = require('password-validator'); /*3K (gzipped: 1.1K)*/

const passwordSchema = new passwordValidator();

/* Validation de la casse pour le mot de passe*/
passwordSchema
.is().min(8)            /* 8 charr min*/
.has().uppercase()      /* minuscule*/
.has().lowercase()      /* majuscule*/
.has().digits()         /* nombre*/
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordSchema;