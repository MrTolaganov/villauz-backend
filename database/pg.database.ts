import { config } from "dotenv";
import { Client } from "pg";

config()

const client = new Client({
  user: process.env.PG_USER,
  port: Number(process.env.PG_PORT),
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
});

client.connect(err => {
  if (err) throw err;
  console.log("PostgresSQL connected successfully");
});

export default client;
