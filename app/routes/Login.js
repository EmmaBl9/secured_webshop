const express = require("express");

const router = express.Router();
const controller = require("../controllers/LoginController");
router.get("/", controller.get);
router.get("/login", controller.get);
router.post("/auth", function (req, res) {
  console.log(req.body);
  const { username, password } = req.body;
});
module.exports = router;
