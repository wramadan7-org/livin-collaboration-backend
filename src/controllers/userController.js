import httpStatus from 'http-status';
import BaseError from '../middlewares/baseError.js';
import catchAsync from '../helpers/catchAsync.js';
import bcrypting from '../helpers/bcrypting.js';
import userService from '../services/userService.js';

const createUserController = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    accountType,
    age,
    gender,
    password,
    confirmPassword,
  } = req.body;

  const checkingEmail = await userService.getUserByEmailOrUsername(email);
  const checkUsername = await userService.getUserByEmailOrUsername(username);

  if (checkingEmail.rowCount !== 0) throw new BaseError('Email already exists.', httpStatus.CONFLICT);
  if (checkUsername.rowCount !== 0) throw new BaseError('Username already exists.', httpStatus.CONFLICT);
  if (confirmPassword !== password) throw new BaseError('Password is not match.', httpStatus.BAD_REQUEST);

  // Hashing password string from body to random string
  const hashing = await bcrypting.hashPassword(password);

  // Override password from body to random string from hashing
  const data = {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    accountType,
    age,
    gender,
    password: hashing,
  };

  const arrayValue = Object.values(data);

  const create = await userService.createUserService(arrayValue);

  const { rows } = create;

  // if (!rowCount <= 0) throw new BaseError('Fail to create user.', httpStatus.CONFLICT);

  res.sendWrapped('User created.', rows, httpStatus.CREATED);
});

const getAllUserController = catchAsync(async (req, res) => {
  const users = await userService.getAllUserService();

  const { rows, rowCount } = users;

  // Condition if user empty
  if (rowCount <= 0) throw new BaseError('User is empty.', httpStatus.NOT_FOUND);

  return res.sendWrapped('List of all users', rows, httpStatus.OK);
});

const getUserByIdController = catchAsync(async (req, res) => {
  const { idUser } = req.params;

  const user = await userService.getUserByIdService(idUser);

  const { rowCount, rows } = user;

  // Condition if user with thats ID is not found
  if (rowCount <= 0) throw new BaseError(`User with ID ${idUser} not found.`, httpStatus.NOT_FOUND);

  res.sendWrapped(`User with ID ${idUser}`, ...rows, httpStatus.OK);
});

export default {
  createUserController,
  getAllUserController,
  getUserByIdController,
};
