//module pour autoriser et controller le téléchargement d'image
const multer = require("multer");
/*GESTION DES IMAGES*/
// formats acceptés


//controler taille image à faire
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // indiquer le path (chemin)
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // indiquer le rename
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
