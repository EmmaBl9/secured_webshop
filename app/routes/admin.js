const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const path = require("path");
const db = require("../db/db_config");
const { Console } = require("console");

router.get("/", async (req, res) => {
  // Vérification si token valide
  try {
    const userData = await LoginController.verifySession(
      req.cookies.Authorization
    );
    console.log(userData);
    //vérifier si il est admin
    if (userData.isAdmin !== 1) {
      return res.status(401).send("Vous ne passerez pas...");
    }
  } catch (err) {
    console.log("Token error : ", err);
    return res.status(400).send("Oue pas ouf un...");
  }

  // Récupération de tous les utilisateurs correspondant à la recherche
  try {
    if (!req.query.search) {
      req.query.search = "";
    }

    const [users] = await db.db.query(
      "SELECT id, username FROM t_users WHERE username LIKE ?",
      [`%${req.query.search}%`]
    );
    console.log(users);
    // Si Admin renvoie la page admin
    return res.render("admin.ejs", {
      users: users,
      search: req.query.search,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).send("Impossible de trouver les utilisateurs");
  }
});

module.exports = router;
