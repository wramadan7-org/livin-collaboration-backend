import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import * as dotenv from 'dotenv';
import httpStatus from 'http-status';
import routesV1 from './routes/v1/index.js';
import configDb from './config/db.js';
import errorHandler from './helpers/errorHandler.js';
import logger from './config/logger.js';

dotenv.config();

const { NODE_PORT } = process.env;
const { isOperational, returnError } = errorHandler;

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
configDb.connectDb();

// Set response wrapper
app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

process.on('uncaughtException', (error) => {
  logger.error(error);

  if (!isOperational(error)) {
    process.exit(1);
  }
});

// If the Promise is rejected this will catch it
process.on('unhandledRejection', (error) => {
  throw error;
});

app.use(returnError);

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}.`);
});

export default app;
