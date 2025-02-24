const express = require("express");
const router = express.Router();
const path = require("path");
const LoginController = require("../controllers/LoginController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});

router.post("/auth", async function (req, res) {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Vérifier si l'utilisateur est valide
    const isValidUser = await LoginController.verifyLogin(username, password);
    if (!isValidUser) {
      return res.status(401).send("Erreur dans les informations de connexion");
    }

    // Création du token
    const token = await LoginController.createSession(req, res);

    // Stocker le token dans un cookie sécurisé et rediriger vers /account
    res
      // Sécurisé
      .cookie("Authorization", token, { httpOnly: true, secure: true })
      // Stocker l'username
      .cookie("username", username, { httpOnly: true })
      // Rediriger l'utilisateur
      .redirect("/account");
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return res
      .status(500)
      .send("Erreur serveur, veuillez réessayer plus tard.");
  }
});

module.exports = router;
