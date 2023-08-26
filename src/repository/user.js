const dbPool = require("../utils/DB");

const getUsers = () => {
  const sql = "SELECT * FROM users";

  return dbPool.query(sql);
};

const addUser = (nama, email, password) => {
  const createdAt = new Date();
  const sql =
    "INSERT INTO users (name, email, password, created_at) VALUE(?, ?, ?, ?)";
  const value = [nama, email, password, createdAt];

  const result = dbPool.query(sql, value);

  return result;
};

const upadateUser = (id, name, email) => {
  const sql = "UPDATE users SET name = ?, email=? WHERE id = ?";
  const value = [name, email, id];
  const result = dbPool.query(sql, value);

  return result;
};

const deleteUser = (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

const getUserByEmail = (email) => {
  const sql = "SELECT id, name, email, password FROM users WHERE email = ?";

  return dbPool.query(sql, [email]);
};

const getUserById = (id) => {
  const sql = "SELECT id, name, email, password FROM users WHERE id = ?";
  return dbPool.query(sql, [id]);
};

module.exports = {
  getUsers,
  addUser,
  upadateUser,
  deleteUser,
  getUserByEmail,
  getUserById,
};
