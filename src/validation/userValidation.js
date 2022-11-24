import { body } from 'express-validator';
import validationErrorMessage from '../constants/validationErrorConstant.js';

const createUserValidation = [
  body('firstName')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY),
  body('lastName')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY),
  body('email')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .isEmail()
    .withMessage(validationErrorMessage.EMAIL_INCORRECT),
  body('phoneNumber')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .matches(/^\d*$/)
    .withMessage(validationErrorMessage.ONLY_CONTAIN_NUMBER)
    .isLength({ min: 11 })
    .withMessage(`${validationErrorMessage.MIN_LENGTH} 11 character.`)
    .isLength({ max: 13 })
    .withMessage(`${validationErrorMessage.MAX_LENGTH} 13 character.`),
  body('accountType')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .isIn(['private', 'public'])
    .withMessage(validationErrorMessage.ACCOUNT_TYPE),
  body('gender')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .isIn(['male', 'female'])
    .withMessage(validationErrorMessage.GENDER),
  body('password')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .isLength({ min: 8 })
    .withMessage(`${validationErrorMessage.MIN_LENGTH} 8 character.`)
    .isLength({ max: 20 })
    .withMessage(`${validationErrorMessage.MAX_LENGTH} 20 character.`),
  body('confirmPassword')
    .notEmpty()
    .withMessage(validationErrorMessage.FIELD_CANNOT_BE_EMPTY)
    .isLength({ min: 8 })
    .withMessage(`${validationErrorMessage.MIN_LENGTH} 8 character.`)
    .isLength({ max: 20 })
    .withMessage(`${validationErrorMessage.MAX_LENGTH} 20 character.`),
];

export default {
  createUserValidation,
};
