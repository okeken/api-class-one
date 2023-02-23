const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const { createTask, getAllTask } = require("../controller/task");

const taskRouter = express.Router();

// taskRouter.use(verifyToken);
taskRouter.post("/", verifyToken, createTask).get("/", getAllTask);

module.exports = taskRouter;
