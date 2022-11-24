import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

// Parallel processing
// eslint-disable-next-line consistent-return
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const data = {
    details: errors.array(),
  };

  res.sendWrapped('Invalid value', data, httpStatus.BAD_REQUEST);
};

export default validate;
