import httpStatus from 'http-status';
import BaseError from '../helpers/baseError.js';
import userService from '../services/userService.js';

const getAllUserController = async (req, res) => {
  try {
    const users = await userService.getAllUserService();

    if (users.rowCount <= 0) throw new BaseError(httpStatus.NOT_FOUND, 'User is empty.');

    return res.sendWrapped(users, 'List of all users', httpStatus.OK);
  } catch (error) {
    return error;
  }
};

export default {
  getAllUserController,
};
