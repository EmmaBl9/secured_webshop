const forbiddenChars = [
  ";",
  "--",
  "/*",
  "*/",
  "<",
  ">",
  "*",
  "/",
  "%",
  "'",
  '"',
  "\\",
  "|",
  "^",
  "&",
  "!",
  "?",
  ":",
  "@",
  "#",
  "$",
  "`",
  "~",
  "OR",
  "AND",
  "SELECT",
  "INSERT",
  "UPDATE",
  "DELETE",
  "DROP",
  "CREATE",
  "ALTER",
  "TRUNCATE",
  "EXEC",
  "UNION",
  "JOIN",
];

const verifyEntry = (entry, res = null) => {
  // Vérifier les entrées afin d'éviter les injections SQL
  const invalidChars = forbiddenChars.filter((char) => entry.includes(char));

  if (invalidChars.length > 0) {
    console.error("Entrée invalide détectée :", invalidChars.join(", "));
    if (res) {
      return res.status(400).json({
        error: `Une entrée contient des caractères interdits. Caractères interdits détectés : ${invalidChars.join(
          ", "
        )}`,
      });
    } else {
      return `Une entrée contient des caractères interdits. Caractères interdits détectés : ${invalidChars.join(
        ", "
      )}`;
    }
  }
};

export { verifyEntry, forbiddenChars };
