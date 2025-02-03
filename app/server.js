const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();

//appel un middleware pour analyser les données d'un formulaire envoyé
app.use(express.urlencoded({ extended: true }));

//Route pour user
const userRoute = require("./routes/User");
app.use("/user", userRoute);

//Route pour le login
const loginRoute = require("./routes/Login");
app.use("/login", loginRoute);

//Route pour le register
const registerRoute = require("./routes/Register");
app.use("/register", registerRoute);

// Ajouter la licence
// Charger les clés SSL
const privateKey = fs.readFileSync("privkey.key", "utf8");
const certificate = fs.readFileSync("certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Créer le serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrage du serveur
httpsServer.listen(443, () => {
  console.log("Server running on port https://localhost:443/user");
});
