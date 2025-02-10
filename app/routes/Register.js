const express = require("express");
const db_config = require("../db/db_config");
const bcrypt = require("bcrypt");
const router = express.Router();
const controller = require("../controllers/RegisterController");

router.get("/", controller.get);

router.get("/createUser", function (req, res) {
  res.redirect("/login");
});

router.post("/createUser", async function (req, res) {
  const { username, password } = req.body;
  console.log(req.body);

  //TODO : Vérifier les entrées afin d'éviter les injections SQL ou XSS

  try {
    //définir le sel
    const salt = 10;
    //hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

    // Ajouter à la db
    db_config.createUser(username, hashedPassword);
    // retourner que c'est bon
    res.status(200).redirect("/login");
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).send("Erreur lors de la création de l'utilisateur.");
  }
});

//router.get('/createUser', function (req, res) {
//});

module.exports = router;
