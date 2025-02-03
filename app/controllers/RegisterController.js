const { get } = require("./UserController");

module.exports = {
  get: (req, res) => {
    //Afficher l'html
    res.sendFile("register.html", { root: "./view" });
  },
};
