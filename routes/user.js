const express = require("express");
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  promoteUser,
} = require("../controller/user");
const { isSuperAdmin } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter
  .post("/promote", [isSuperAdmin], promoteUser)
  .get("/", getAllUser)
  // .post("/", createUser)
  .get("/:id", getUserById)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = userRouter;
