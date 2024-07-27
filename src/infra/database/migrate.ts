import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  const migrationClient = drizzle(postgres(connectionString!));

  await migrate(migrationClient, {
    migrationsFolder: 'src/infra/database/migrations',
  });
}

runMigration().then(() => console.log('Migrations done'));
