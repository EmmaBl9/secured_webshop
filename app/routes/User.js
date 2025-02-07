const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");
const jwt = require("jsonwebtoken");

/*const queryInsert = "INSERT INTO t_users (username, password) VALUE (?, ?)";
router.post("/", (req, res) => {
  // TODO : Créer un nouvel utilisateur
  // Infos
  const { username, password } = req.body;

  if (username || password === null) {
    return res.status(400);
  }
});

router.post("/createSession", (req, res) => {
  // TODO : Créer un nouveau token / se connecter
});*/

module.exports = router;
