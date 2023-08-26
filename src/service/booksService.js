const { nanoid } = require("nanoid");
const {
  addBoook,
  getBooks,
  getBookById,
  updateById,
  deleteById,
} = require("../repository/book");
const { errorRes, succesRes } = require("../utils/response");

const postBoooksService = async (request, response, next) => {
  try {
    const id = nanoid(16);
    const nama = request.body.nama;
    const halaman = request.body.halaman;
    const penulis = request.body.penulis;
    const terbit = request.body.terbit;

    const result = await addBoook(id, nama, halaman, penulis, terbit);
    if (result === 0) {
      throw errorRes(response, "gagal menambahkan");
    }
    succesRes(response, "success", result.id);
  } catch (error) {
    next(error);
  }
};

const getBooksService = async (request, response, next) => {
  try {
    const [result] = await getBooks();
    succesRes(response, "success", result);
  } catch (error) {
    next(error);
  }
};

const getBookByIdService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getBookById(id);
    if (result.length == 0) {
      throw errorRes(res, "id tidak ditemukan");
    }
    succesRes(res, "success", result);
  } catch (error) {
    next(error);
  }
};

const updateBookByIdService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const nama = req.body.nama;
    const halaman = req.body.halaman;
    const penulis = req.body.penulis;
    const terbit = req.body.terbit;

    const [result] = await updateById(id, nama, halaman, penulis, terbit);
    succesRes(res, "success", result);
  } catch (error) {
    next(error);
  }
};

const deleteBookByIdService = async (req, res, next) => {
  try {
    const id = req.params.id;

    const [result] = await deleteById(id);
    succesRes(res, "success", result.insertId);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postBoooksService,
  getBooksService,
  getBookByIdService,
  updateBookByIdService,
  deleteBookByIdService,
};
