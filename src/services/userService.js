import db from '../config/db.js';

/**
 * Service to get all user from DB
 * @returns Array
 */
const getAllUserService = async () => {
  const users = await db.pool.query('SELECT * FROM users');

  return users;
};

/**
 * Service to get user by Id from DB
 * @param {Number} id
 * @returns Object
 */
const getUserByIdService = async (id) => {
  const user = await db.pool.query(`SELECT * FROM users WHERE id = ${id}`);

  return user;
};

export default {
  getAllUserService,
  getUserByIdService,
};
