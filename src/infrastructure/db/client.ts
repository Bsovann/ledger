import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// Local dev uses SQLite; Week 6 swaps this file for a Postgres (Neon) client.
const sqlite = new Database(process.env.DATABASE_URL ?? "ledger.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
