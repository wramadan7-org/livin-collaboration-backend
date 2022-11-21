import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import * as dotenv from 'dotenv';
import routesV1 from './routes/v1/index.js';
import connectDb from './config/db.js';

dotenv.config();

const { NODE_PORT } = process.env;

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse URLEncoded request body
app.use(express.urlencoded({ extended: false }));

// Sanitize request data
app.use(xss());

// Gzip compression
app.use(compression());

// Enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', routesV1);

// Connect the database PostgreSQL
connectDb();

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}.`);
});

export default app;
