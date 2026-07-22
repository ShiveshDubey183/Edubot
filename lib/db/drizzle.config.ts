import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Load .env from workspace root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn(
    "[@workspace/db] WARNING: DATABASE_URL not set. Using placeholder URL for drizzle-kit.",
  );
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
