module.exports = {
  get: (req, res) => {
    //Afficher l'html
    res.sendFile("user.html", { root: "./view" });
  },
  login: (req, res) => {
    //Afficher l'html
    res.sendFile("login.html", { root: "./view" });
  },
  register: (req, res) => {
    //Afficher l'html
    res.sendFile("register.html", { root: "./view" });
  },
};
