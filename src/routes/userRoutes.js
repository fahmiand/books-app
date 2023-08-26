const express = require("express");
const {
  postUserService,
  authenticationsUserService,
  getUsersService,
} = require("../service/userService");

const userRoutes = express.Router();

userRoutes.get("/", getUsersService);
userRoutes.post("/", postUserService);
userRoutes.post("/auth", authenticationsUserService);

module.exports = userRoutes;
