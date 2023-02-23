const { taskDb } = require("../models/task");

const createTask = async (req, res) => {
  const title = req.body.title;
  const creator = req.user.username;
  try {
    const created = new taskDb({ title, creator });
    await created.save();

    return res.status(201).json({
      status: true,
      message: "task created successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await taskDb.find({});

    return res.status(200).json({
      status: true,
      data: tasks,
    });
  } catch {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getAllTask,
};
