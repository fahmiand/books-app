const {
  getUsers,
  addUser,
  getUserById,
  getUserByEmail,
} = require("../repository/user");
const { succesRes, errorRes } = require("../utils/response");
const bcrypt = require("bcrypt");

const getUsersService = async (request, response, next) => {
  try {
    const [result] = await getUsers();
    succesRes(response, "success", result);
  } catch (error) {
    err = new Error("Meeting not found");
    err.status = 404;
    next(error);
  }
};

const postUserService = async (request, response, next) => {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    const saltRound = 10;
    bcrypt.hash(password, saltRound, async (err, hash) => {
      const [result] = await addUser(name, email, hash);
      let id = result.insertId;
      const [user] = await getUserById(id);
      succesRes(response, "success", user[0], 201);
    });
  } catch (error) {
    next(error);
  }
};

const authenticationsUserService = async (requset, response, next) => {
  try {
    const email = requset.body.email;
    const password = requset.body.password;
    const [result] = await getUserByEmail(email);

    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let data = {
            id: user.user_id,
            name: user.name,
            email: user.email,
          };

          succesRes(response, "success", data);
        }
      });
    } else {
      errorRes(response, "email dan password salah");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersService,
  postUserService,
  authenticationsUserService,
};
