import httpStatus from 'http-status';
import BaseError from '../middlewares/baseError.js';
import catchAsync from '../helpers/catchAsync.js';
import userService from '../services/userService.js';

const getAllUserController = catchAsync(async (req, res) => {
  const users = await userService.getAllUserService();

  const { rows, rowCount } = users;

  if (rowCount <= 0) throw new BaseError('User is empty.', httpStatus.NOT_FOUND);

  return res.sendWrapped('List of all users', rows, httpStatus.OK);
});

const getUserByIdController = catchAsync(async (req, res) => {
  const { idUser } = req.params;

  const user = await userService.getUserByIdService(idUser);

  const { rowCount, rows } = user;

  if (rowCount <= 0) throw new BaseError(`User with ID ${idUser} not found.`, httpStatus.NOT_FOUND);

  res.sendWrapped(`User with ID ${idUser}`, ...rows, httpStatus.OK);
});

export default {
  getAllUserController,
  getUserByIdController,
};
