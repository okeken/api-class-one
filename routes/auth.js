const express = require("express");
const { createUser, login } = require("../controller/auth");
const validate = require("../validate");
const loginSchema = require("../schema/login");
const { promoteUser } = require("../controller/user");

const authRouter = express.Router();

authRouter
  .post("/promote", promoteUser)
  .post("/", createUser)
  .post("/login", validate(loginSchema), login);

module.exports = authRouter;
