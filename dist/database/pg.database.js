"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const pg_1 = require("pg");
(0, dotenv_1.config)();
const client = new pg_1.Client({
    user: process.env.PG_USER,
    port: Number(process.env.PG_PORT),
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
});
client.connect(err => {
    if (err)
        throw err;
    console.log("PostgresSQL connected successfully");
});
exports.default = client;
