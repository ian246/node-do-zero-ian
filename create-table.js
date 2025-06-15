import sql from "./db.js";

(async () => {
  try {
    sql`
        CREATE TABLE videos (
        id       TEXT PRIMARY KEY,
        title    TEXT ,
        describe TEXT,
        duration INTEGER

 );`.then(() => {
      console.log("Tabela criada com sucesso");
    });
  } catch (error) {
    console.error("Erro ao remover tabela:", error);
  }
})();
