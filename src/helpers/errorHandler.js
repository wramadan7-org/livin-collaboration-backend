import BaseError from './baseError.js';

const logError = (error) => {
  console.error(error);
};

const logErrorMiddleware = (error, req, res, next) => {
  logError(error);
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
  logError,
  logErrorMiddleware,
  returnError,
  isOperational,
};
