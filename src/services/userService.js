import db from '../config/db.js';

const getAllUserService = async () => {
  const users = await db.pool.query('SELECT * FROM users');

  return users;
};

const getUserByIdService = async (id) => {
  const user = await db.pool.query(`SELECT * FROM users WHERE id = ${id}`);

  return user;
};

export default {
  getAllUserService,
  getUserByIdService,
};
