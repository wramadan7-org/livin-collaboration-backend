class BaseError extends Error {
  constructor(statusCode, message, stack, isOperational = true) {
    super(stack);
    console.log(`statusCode ${statusCode}, name ${message}`);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export default BaseError;
