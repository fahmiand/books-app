const dbPool = require("../utils/DB");
const { errorRes } = require("../utils/response");

const addBoook = async (id, nama, halaman, penulis, terbit) => {
  const sql =
    "INSERT INTO books ( id, nama, halaman, penulis, terbit) VALUE(?, ?, ?, ?, ?)";
  const value = [id, nama, halaman, penulis, terbit];

  const result = await dbPool.query(sql, value);

  return result;
};

const getBooks = async () => {
  const result = await dbPool.query("SELECT * FROM books");

  return result;
};

const getBookById = async (id) => {
  const result = await dbPool.query("SELECT * FROM books WHERE id = ? ", [id]);

  return result[0];
};

const updateById = async (id, nama, halaman, penulis, terbit) => {
  const sql = `UPDATE books SET
                    nama = ?, halaman = ?,
                    penulis = ?, terbit = ?
                    WHERE id = ?`;
  const value = [nama, halaman, penulis, terbit, id];

  const result = await dbPool.query(sql, value);

  return result;
};

const deleteById = async (id) => {
  const result = await dbPool.query("DELETE FROM books WHERE id = ?", [id]);

  return result;
};

module.exports = {
  addBoook,
  getBooks,
  getBookById,
  updateById,
  deleteById,
};
