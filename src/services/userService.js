import db from '../config/db.js';

/**
 * Service to create user
 * @param {Array} data
 * @returns Object
 */
const createUserService = async (data) => {
  const user = await db.pool.query('INSERT INTO users (firstname, lastname, username, email, phonenumber, accounttype, age, gender, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', data);

  return user;
};

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

/**
 * Service to get user by email or username
 * @param {String} emailOrUsername
 * @returns Object
 */
const getUserByEmailOrUsername = async (emailOrUsername) => {
  const user = await db.pool.query(`SELECT * FROM users WHERE email = '${emailOrUsername}' OR username = '${emailOrUsername}'`);

  return user;
};

export default {
  createUserService,
  getAllUserService,
  getUserByIdService,
  getUserByEmailOrUsername,
};
