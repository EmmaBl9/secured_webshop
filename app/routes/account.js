const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Vérifier si le nom d'utilisateur est stocké dans un cookie ou une requête
  const username = req.cookies.username;
  // Rendre la vue EJS avec le nom de l'utilisateur
  res.render("account", { username });
});

// Route pour la déconnexion
router.get("/logout", (req, res) => {
  res.clearCookie("Authorization").clearCookie("username").redirect("/login");
});

module.exports = router;
