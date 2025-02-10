const express = require("express");
const db_config = require("../db/db_config");
const bcrypt = require("bcrypt");
const router = express.Router();
const controller = require("../controllers/RegisterController");

router.get("/", controller.get);

router.post("/createUser", function (req, res) {
  const { username, password } = req.body;

  //const queryInsert = "INSERT INTO t_users (username, password) VALUE (?, ?)";

  router.post("/", (req, res) => {
    // TODO : Créer un nouvel utilisateur
    // Infos
    const { username, password } = req.body;

    if (username || password === null) {
      return res.status(400);
    }
  });

  // Ajouter des vérifications
  // Exécution de la requête
  db_config.createUser(username, password);

  db_config.query(queryInsert, [username, password], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return res.status(500).json({
        error: "Erreur serveur lors de la création de l'utilisateur.",
      });
    }
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  });
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
