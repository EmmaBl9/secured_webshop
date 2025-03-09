const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const { getUserData } = require("../controllers/UserController");

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

// Route pour la page de l'utilisateur
router.get("/:id", async (req, res) => {
  // Vérifier si le paramètre id est correct
  const id = Number(req.params.id); // Si c'est pas un nombre => NaN (Not a Number) et du coup false
  if (!id || isNaN(id)) {
    return res.status(400).send("Id incorrect");
  }
  let user;
  try {
    const userData = await LoginController.verifySession(
      req.cookies.Authorization
    );
    console.log(userData);
    //vérifier si il est admin
    if (userData.isAdmin !== 1 && userData.id !== req.params.id) {
      return res.status(401).send("Vous ne passerez pas...");
    }

    // Récupréer les données de l'utilisateur
    user = await getUserData(id);
  } catch (err) {
    console.log("Token error : ", err);
    return res.status(400).send("Oue pas ouf...");
  }

  // Rendre la vue EJS avec les infos utilisateurs
  return res.render("userAccount", { user });
});

module.exports = router;
