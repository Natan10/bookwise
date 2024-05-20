import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/schema.ts",
  dialect: "postgresql",
  out: "./src/infra/database/migrations",
  dbCredentials: {
    url: process.env.CONNECTION_STRING!,
    // host: process.env.POSTGRES_HOST!,
    // port: +process.env.POSTGRES_PORT!,
    // password: process.env.POSTGRES_PASSWORD!,
    // database: process.env.POSTGRES_DATABASE!,
  },
} satisfies Config;
