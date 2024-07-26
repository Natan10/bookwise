import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './src/infra/database/schema.ts',
  out: './src/infra/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
