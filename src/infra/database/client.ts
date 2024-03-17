import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionsString = process.env.CONNECTION_STRING;

const sql = postgres(connectionsString!, { max: 1 });
const db = drizzle(sql);

export { sql, db };
