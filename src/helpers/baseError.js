class BaseError extends Error {
  constructor(message, statusCode, stack, isOperational = true) {
    super(stack);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export default BaseError;
