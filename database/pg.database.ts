import { config } from "dotenv";
import { Client } from "pg";

config();

const client = new Client({
  connectionString: process.env.DB_URI,
});

client.connect(err => {
  if (err) {
    console.log("PostgresSQL error", err.stack);
  } else {
    console.log("PostgresSQL connected successfully");
  }
});

export default client;
