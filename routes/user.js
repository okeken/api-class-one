const express = require("express");
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user");
const { createUser } = require("../controller/auth");

const userRouter = express.Router();

userRouter
  .get("/", getAllUser)
  .get("/:id", getUserById)
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = userRouter;
