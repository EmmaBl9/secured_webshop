const express = require("express");
const router = express.Router();
const path = require("path");
const LoginController = require("../controllers/LoginController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});

router.post("/auth", async function (req, res) {
  const { username, password } = req.body;

  if (!LoginController.verifyLogin(username, password)) {
    return res.status(401).send("Erreur dans les informations de connection");
  }

  try {
    const token = await LoginController.createSession(username, password);

    // Ajouter le cookie et rediriger vers la page de compte
    res
      // Stocke le token dans un cookie sécurisé
      .cookie("Authorization", token, { httpOnly: true })
      // Stocker le nom d'utilisateur
      .cookie("username", username, { httpOnly: true })
      // Redirige vers la page de compte
      .redirect("/account");
  } catch (err) {
    console.log("Erreur lors de la création du token de connection : " + err);
    return res
      .status(500)
      .send("Erreur serveur, veuillez réessayer plus tard.");
  }
});

module.exports = router;
