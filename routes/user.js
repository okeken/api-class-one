const express = require("express");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user");

const userRouter = express.Router();

userRouter
  .get("/", getAllUser)
  .get("/:id", getUserById)
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = userRouter;
