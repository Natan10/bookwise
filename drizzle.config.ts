import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/schema.ts",
  dialect: "postgresql",
  out: "./src/infra/database/migrations",
  dbCredentials: {
    url: process.env.CONNECTION_STRING!,
  },
} satisfies Config;
