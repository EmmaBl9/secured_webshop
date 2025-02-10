require("dotenv").config();
const sql = require("mysql2/promise");
const settings = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
};

const db = sql.createPool(settings);

const createConnection = () =>
  db
    .getConnection()
    .then((connection) => {
      console.log("Database connected");
      return connection; // Retourne la connexion pour utilisation ultérieure
    })
    .catch((err) => {
      console.error("Error connecting to DB:", err);
      throw err; // Relance l'erreur pour gestion externe
    });

///////       TOUTE LES REQUÊTES SERONT EXÉCUTÉE ICI        \\\\\\\\

const createUser = async function (username, password) {
  // Fonction pour créer l'utilisateur
  db.query("INSERT INTO t_users (username, hashedPassword) VALUES (?, ?)", [
    username,
    password,
  ]);
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

module.exports = { db, createUser };
