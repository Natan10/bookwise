import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

import { env } from '@/infra/env';
import * as schema from './schema';

const connectionString = env.DATABASE_URL;

const pool = new Pool({ connectionString: connectionString! });
const db = drizzle(pool, { schema });

export { db, pool };
