const express = require("express");
const { createTask, getAllTask, getByUsername } = require("../controller/task");
const { verifyToken } = require("../middlewares/auth");
const paginate = require("../middlewares/paginate");
const { taskDb } = require("../models/task");

const taskRouter = express.Router();
const wrapper = (req, res, next) => {
  paginate(req, res, next, taskDb);
};
taskRouter
  .post("/", createTask)
  .get("/:username", wrapper, getByUsername)
  .get("/", wrapper, getAllTask);

module.exports = taskRouter;
