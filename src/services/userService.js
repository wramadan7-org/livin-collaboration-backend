import db from '../config/db.js';

const getAllUserService = async () => {
  const users = await db.pool.query('SELECT * FROM users WHERE email = \'wramadan1203@gmail.com\'');

  return users;
};

export default {
  getAllUserService,
};