import httpStatus from 'http-status';
import BaseError from '../helpers/baseError.js';
import userService from '../services/userService.js';

const getAllUserController = async (req, res, next) => {
  try {
    const users = await userService.getAllUserService();

    if (users.rowCount <= 0) throw new BaseError('User is empty.', httpStatus.NOT_FOUND);

    return res.sendWrapped('List of all users', null, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUserController,
};
