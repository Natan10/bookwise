import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/schema.ts",
  driver: "pg",
  out: "./src/infra/database/migrations",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: +process.env.POSTGRES_PORT!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
  },
} satisfies Config;

/*
generate migration -> npm drizzle-kit generate:pg

*/
