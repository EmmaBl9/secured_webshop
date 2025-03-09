const db = require("../db/db_config");

const getUserData = async (userId) => {
  try {
    if (!Number(userId)) {
      return false;
    }

    const [userData] = await db.db.query("SELECT * FROM t_users WHERE id = ?", [
      userId,
    ]);
    // Enlever les propriétés non nécessaires
    const { hashedPassword, ...userWithoutPassword } = userData[0];

    return userWithoutPassword;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Database query failed");
  }
};

module.exports = {
  getUserData,
};
