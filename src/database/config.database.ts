import "dotenv/config";
import { Client } from "pg";

const { PORT, DB, DB_PASSWORD, DB_USER } = process.env;

export const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: "localhost",
  database: DB,
  port: Number(PORT),
});



