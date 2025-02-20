const express = require("express");
const db_config = require("../db/db_config");
const bcrypt = require("bcrypt");
const router = express.Router();
const controller = require("../controllers/RegisterController");

router.get("/", controller.get);

router.post("/createUser", async function (req, res) {
  const { username, password, confirm_password } = req.body;

  //Vérifier que tous les champs soient remplis
  if (!username || !password || !confirm_password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // Vérifier si les mots de passe correspondent
  if (password !== confirm_password) {
    return res
      .status(400)
      .json({ error: "Les mots de passe ne correspondent pas." });
  }

  try {
    //définir le sel
    const salt = 10;
    //hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

    //Crée l'utilisateur
    await db_config.createUser(username, hashedPassword);

    //redirige vers la page de login une fois l'utilisateur créé avec succès
    res.redirect("/login");
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).send("Erreur lors de la création de l'utilisateur.");
  }
});

//router.get('/createUser', function (req, res) {
//});

module.exports = router;
