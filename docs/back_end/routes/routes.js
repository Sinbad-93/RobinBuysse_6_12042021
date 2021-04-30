const express = require("express");
/* module express permettant la création de routes*/
// module permettant de créer les routes de l'api
const router = express.Router();

/* chemin vers les fichiers*/
const sauceCtrl = require("./controllers/controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/* Toutes les routes produits de notre API, relié aux différentes parties du code, 
notament l'authentification*/
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;
