import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionsString = process.env.CONNECTION_STRING;

const sql = postgres(connectionsString!, { max: 1 });
const db = drizzle(sql, { schema });

export { sql, db };
