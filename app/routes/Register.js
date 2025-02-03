const express = require("express");
const db_config = require("../db/db_config");

const router = express.Router();
const controller = require("../controllers/RegisterController");
router.get("/", controller.get);

router.post("/createUser", function (req, res) {
  const { username, password } = req.body;

  // Ajouter des vérifications
  // Ajouter à la db
  db_config.createUser(username, password);
});

module.exports = router;
