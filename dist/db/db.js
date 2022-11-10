import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
var Pool = pg.Pool;
var databaseConfig = {
    connectionString: process.env.DATABASE_URI,
    ssl: {
        rejectUnauthorized: false
    }
};
var connection = new Pool(databaseConfig);
export default connection;
