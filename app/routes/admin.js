const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");

router.get("/", (req, res) => {
  // Vérification si token valide
  try {
    LoginController.verifySession(req.cookies.Authorization);
  } catch (err) {
    console.log("Token error : ", err);
    return res.status(400).send("Oue pas ouf un...");
  }

  // Si Admin revoie la page admin

  // Si non admin revoie unauthorizedddd
});
