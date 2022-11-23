import BaseError from '../middlewares/baseError.js';
import logger from '../config/logger.js';

const logErrorMiddleware = (error, req, res, next) => {
  logger.error(error);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const returnError = (error, req, res, _next) => {
  res.sendWrapped(error.message, null, error.statusCode);
};

const isOperational = (error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }

  return false;
};

export default {
  logErrorMiddleware,
  returnError,
  isOperational,
};
