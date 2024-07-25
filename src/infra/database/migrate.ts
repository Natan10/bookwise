import * as dotenv from "dotenv";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

dotenv.config();

async function runMigration() {
  const connectionString = process.env.CONNECTION_STRING;
  const migrationClient = drizzle(postgres(connectionString!));

  await migrate(migrationClient, {
    migrationsFolder: "src/infra/database/migrations",
  });
}

await runMigration();
