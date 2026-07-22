import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from workspace root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn(
    "[@workspace/db] WARNING: DATABASE_URL is not set. Database queries will fail.",
  );
  console.warn(
    "[@workspace/db] Create a .env file in the workspace root with DATABASE_URL",
  );
}

export const pool = DATABASE_URL
  ? new Pool({ connectionString: DATABASE_URL })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;

export * from "./schema";
