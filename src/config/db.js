import * as dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const { Pool } = pkg;

const connectDb = async () => {
  try {
    const pool = new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
