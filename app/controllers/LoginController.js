const { get } = require("./UserController");

module.exports = {
  get: (req, res) => {
    //Afficher l'html
    res.sendFile("login.html", { root: "./view" });
  },
};
