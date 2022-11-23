import httpStatus from 'http-status';
import BaseError from '../middlewares/baseError.js';
import catchAsync from '../helpers/catchAsync.js';
import userService from '../services/userService.js';

const getAllUserController = catchAsync(async (req, res) => {
  const users = await userService.getAllUserService();

  if (users.rowCount <= 0) throw new BaseError('User is empty.', httpStatus.NOT_FOUND);

  return res.sendWrapped('List of all users', null, httpStatus.OK);
});

export default {
  getAllUserController,
};
