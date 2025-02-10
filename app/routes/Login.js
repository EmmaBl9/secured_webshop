const express = require("express");

const router = express.Router();
const path = require("path");
const LoginController = require("../controllers/LoginController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});
router.post("/auth", async function (req, res) {
  console.log(req.body);
  const { username, password } = req.body;

  if (!LoginController.verifyLogin(username, password)) {
    return res.status(401).send("Erreur dans les informations de connection");
  }

  try {
    const token = await LoginController.createSession(username, password);
    return res.status(200).cookie("Authorization", token);
  } catch (err) {
    console.log("Erreur lors de la création du token de connection : " + err);
    return res
      .status(500)
      .send(
        "Erreur lors de la création de votre session, veuillez vérifier vos informations et réessayer plus tard."
      );
  }
});

module.exports = router;
