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
  "\\",
  "|",
  "^",
  "&",
  "!",
  "?",
  ":",
  "@",
  "#",
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
  const invalidChars = forbiddenChars.filter((char) =>
    entry.toUpperCase().includes(char.toUpperCase())
  );

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
  return null;
};

export { verifyEntry, forbiddenChars };
