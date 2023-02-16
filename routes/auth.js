const express = require("express");
const { createUser, login } = require("../controller/auth");
const validate = require("../validate");
const loginSchema = require("../schema/login");

const authRouter = express.Router();

authRouter.post("/", createUser).post("/login", validate(loginSchema), login);

module.exports = authRouter;
