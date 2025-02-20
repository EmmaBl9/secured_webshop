const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
//const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", "./view");

// Permet de lire les cookies
//app.use(cookieParser());

//appel un middleware pour analyser les données d'un formulaire envoyé
app.use(express.urlencoded({ extended: true }));

//Route pour le register
const registerRoute = require("./routes/Register");
app.use("/register", registerRoute);

//Route pour le login
const loginRoute = require("./routes/Login");
app.use("/login", loginRoute);

//Route pour le compte
const accountRoute = require("./routes/Account");
app.use("/account", accountRoute);

// Route erreur 404
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Ajouter la licence
// Charger les clés SSL
const privateKey = fs.readFileSync("./certificates/privkey.key", "utf8");
const certificate = fs.readFileSync("./certificates/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Créer le serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrage du serveur
httpsServer.listen(443, () => {
  dotenv.config();
  console.log("Server running on port https://localhost:443/home");
});
