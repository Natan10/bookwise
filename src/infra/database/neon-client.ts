import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

import * as schema from "./schema";

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({ connectionString: connectionString! });
const db = drizzle(pool, { schema });

export { db, pool };
