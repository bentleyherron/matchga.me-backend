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
    host: process.env.DATABASE_URL,
    database: process.env.DB_NAME
};

const db = pgp(options);
export {db};