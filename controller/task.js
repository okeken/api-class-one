const { decodeToken } = require("../middlewares/auth");
const { taskDb } = require("../models/task");
const catchErrors = require("../utils/catchError");

const createTask = async (req, res) => {
  const title = req.body.title;
  // req.params
  const creator = req.user.username;
  try {
    const created = new taskDb({ title, creator });
    await created.save();
    //  await taskDb.create({ title, creator });

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
  const taskFunc = async (req, res) => {
    const { currentUser } = decodeToken(req);
    const isAdmin = currentUser.data.role === "superAdmin";

    const tasks = await taskDb.find({
      ...(isAdmin ? {} : { creator: currentUser.data.username }),
    });
    // const info = { ...req.paginate, data: tasks };
    return res.status(200).json({
      status: true,
      ...req.paginate,
    });
  };

  return await catchErrors(taskFunc, req, res);
};

const getByUsername = async (req, res) => {
  const getUser = async () => {
    // const user = await taskDb.find({
    //   creator: req.params.username,
    // });
    // const info = { ...req.paginate, data: user };
    return res.status(200).json({
      status: true,
      ...req.paginate,
      // data: user,
    });
  };
  return catchErrors(getUser, req, res);
};

module.exports = {
  createTask,
  getAllTask,
  getByUsername,
};
