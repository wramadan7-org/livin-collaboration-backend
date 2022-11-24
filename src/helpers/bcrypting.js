import bcrypt from 'bcrypt';

const salt = 10;

/**
 * Override password to random string
 * @param { String } password
 * @returns Random String
 */
const hashPassword = async (password) => {
  const hashing = await bcrypt.hash(password, salt);

  return hashing;
};

/**
 * Checking password is match or not
 * @param {String} passwordBody
 * @param {String} passwordHashing
 * @returns Boolean
 */
const comparePassword = async (passwordBody, passwordHashing) => {
  const comparing = await bcrypt.compare(passwordBody, passwordHashing);

  return comparing;
};

export default {
  hashPassword,
  comparePassword,
};
