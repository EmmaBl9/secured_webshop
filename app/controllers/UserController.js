module.exports = {
  get: (req, res) => {
    //Afficher l'html
    res.sendFile("user.html", { root: "./view" });
  },
};
