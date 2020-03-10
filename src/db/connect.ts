import * as dotenv from "dotenv";

// Use dotenv for environment variables
dotenv.config();

let initOptions: any;
if (process.env.NODE_ENV === "production") {
    initOptions = {};
} else {
    initOptions = {
        query: (e: any) => {
            console.log(`QUERY: ${e.query}`);
        }};
}

const pgp = require('pg-promise')(initOptions);

const options: object = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
};

let db: any;
if (process.env.NODE_ENV === "production") {
    db = pgp(process.env.DATABASE_URL);
} else {
    db = pgp(options);
}

export {db};