import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, sql } from "./client";

migrate(db, { migrationsFolder: "src/infra/database/migrations" })
  .then(() => {
    console.log("Migrations applied!");
    sql.end().then(() => {
      console.log("Connection closed...");
    });
  })
  .catch((e) => {
    console.log("Erro ao aplicar migrations: ", e.message);
  });
