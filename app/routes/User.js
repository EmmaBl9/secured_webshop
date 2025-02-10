const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");
router.get("/", (req, res) => {
  return res.render("User", { username: "TEST" });
});
module.exports = router;
