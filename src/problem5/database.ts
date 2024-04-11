import { createPool } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: "116.118.51.11",
    user: "99tech",
    password: "KzAwwAZ6eybH5Afj",
    database: "99tech",
    connectionLimit: 30,
  });

  return connection;
}
