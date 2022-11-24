import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};

export default {
  hashPassword,
};
