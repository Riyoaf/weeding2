import { neon } from "@neondatabase/serverless";

const databaseUrl = "postgresql://neondb_owner:npg_LmPyRXB4HW2E@ep-rapid-glade-azc93ka3.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(databaseUrl);

async function main() {
  console.log("Connecting to Neon Postgres...");
  await sql`
    CREATE TABLE IF NOT EXISTS wishes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      attendance TEXT NOT NULL DEFAULT 'Hadir',
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  console.log("SUCCESS! Table 'wishes' has been created in your Neon Postgres database!");
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public';`;
  console.log("Tables in public schema:", tables);
}

main().catch(console.error);
