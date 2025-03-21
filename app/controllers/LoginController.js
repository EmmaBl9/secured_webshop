const jwt = require("../helpers/jwt");
const db = require("../db/db_config.js");
const bcrypt = require("bcrypt");
const { verifyEntry } = require("../helpers/secureEntry.js");

// Fonction qui vérifie si les informations de connexion correspondent à celles de la base de données
const verifyLogin = async (username, password) => {
  if (!username || !password) {
    console.error("Nom d'utilisateur ou mot de passe manquant");
    return false;
  }

  // Vérifier les entrées afin d'éviter les injections SQL
  if (verifyEntry(username) || verifyEntry(password)) {
    console.error("Entrée invalide détectée");
    return false;
  }

  try {
    // Requête qui récupère les informations de l'utilisateur depuis la base de données revoie un tableau à deux colonnes
    const [rows] = await db.db.query(
      "SELECT * FROM t_users WHERE username = ?",
      [username]
    );

    // Vérifie si aucun utilisateur n'a été trouvé avec ce nom d'utilisateur
    if (rows.length === 0) {
      console.log("Aucun utilisateur trouvé :", username);
      return false;
    }
    // Récupère les données de l'utilisateur
    const user = rows[0];
    console.log("Données de l'utilisateur :", user);

    // Comparaison du mot de passe entré par l'utilisateur avec le mot de passe haché en base de données
    const correct = await bcrypt.compare(password, user.hashedPassword);

    if (correct) {
      console.log("Mot de passe correct !");
      return true;
    } else {
      console.log("Mot de passe incorrect.");
      return false;
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de la connexion :", err);
    return false;
  }
};

const createSession = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.body) {
      return reject(new Error("Aucune donnée reçue dans la requête"));
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return reject(new Error("Nom d'utilisateur ou mot de passe manquant"));
    }

    // Vérifier les entrées afin d'éviter les injections SQL
    let errorValidation;
    if ((errorValidation = verifyEntry(username) || verifyEntry(password))) {
      console.error("Entrée invalide détectée");
      return reject(new Error(errorValidation));
    }

    try {
      const [rows] = await db.db.query(
        "SELECT id FROM t_users WHERE username = ?",
        [username]
      );

      const token = await jwt.createToken({ sub: rows[0].id, username });
      if (token) {
        resolve(token);
      } else {
        reject(new Error("Impossible de générer un token"));
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Vérification du token
const verifySession = (token) => {
  return new Promise(async (resolve, reject) => {
    if (!token) {
      reject("No token");
      return;
    }

    // Vérifier les entrées afin d'éviter les injections SQL
    if (verifyEntry(token)) {
      console.error("Entrée invalide détectée");
      return reject("Token Invalide");
    }

    try {
      const decoded = await jwt.verifyToken(token);
      try {
        const [userData] = await db.db.query(
          "SELECT id, username, isAdmin FROM t_users WHERE id = ?",
          [Number(decoded.sub)]
        );
        return resolve(userData[0]);
      } catch (err) {}
    } catch (err) {
      reject("Token Invalide");
    }
  });
};

module.exports = { verifyLogin, createSession, verifySession };
