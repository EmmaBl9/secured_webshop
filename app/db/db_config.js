require("dotenv").config();
const sql = require("mysql2");
const db = sql.createConnection(
  {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  }, //Si il y a une erreur
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);

///////       TOUTE LES REQUÊTES SERONT EXÉCUTÉE ICI        \\\\\\\\

const createUser = function (username, password) {
  // Fonction pour créer l'utilisateur
  db.promise().query(
    "INSERT INTO t_users (useName, usePassword) VALUES (?, ?)",
    [username, password]
  );
};

//Ajouter un auto increment

/*
//exemple de requête SQL (example venant du code de Ethan Rotzetter)
const getAllUsers = async () => {
  try {
    const results = await db.promise().query("SELECT * FROM t_users;");
    // console.log('results : ', results);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
};

//requête pour avoir un utilistateur

const getUser = async (name) => {
  try {
    const results = await db
      .promise()
      .query(`SELECT * FROM t_users where useName = "${name}";`);
    console.log(results);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
};*/

module.exports = { createUser };
