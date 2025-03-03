const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");

router.get("/", async (req, res) => {
  // Vérifier si le nom d'utilisateur est stocké dans un cookie ou une requête
  const username = req.cookies.username;

  const token = req.cookies.Authorization;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const { isAdmin } = await LoginController.verifySession(token);

    // Rendre la vue EJS avec le nom de l'utilisateur
    return res.render("account", { username, isAdmin });
  } catch (err) {
    console.log(err);
    return res.status(400).redirect("/login");
  }
});

// Route pour la déconnexion
router.get("/logout", (req, res) => {
  res.clearCookie("Authorization").clearCookie("username").redirect("/login");
});

module.exports = router;
