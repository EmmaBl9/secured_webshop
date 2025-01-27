const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();

//Route pour user
const userRoute = require("./routes/User");
app.use("/user", userRoute);

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
