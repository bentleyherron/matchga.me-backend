import * as dotenv from "dotenv";

// Use dotenv for environment variables
dotenv.config();

const pgp = require('pg-promise')({
    query: (e: any) => {
        // print the SQL query
        console.log(`QUERY: ${e.query}`);
    }
});

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