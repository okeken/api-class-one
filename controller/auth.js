const user = require("../user.json");
const fs = require("fs/promises");
const { UserDb } = require("../models/user");
const bcrypt = require("bcryptjs");

const saltRound = process.env.SALT_ROUND;

// joi
// express- validator
// yup
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // find user wit email
    const user = await UserDb.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "email not available",
      });
    }
    const userName = await UserDb.findOne({ username });

    if (userName) {
      return res.status(400).json({
        message: "username already taken",
      });
    }
    const created = new UserDb({
      username,
      email,
      hashedPassword: hashed,
    });
    await created.save();
    return res.status(201).json({
      data: "user created",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserDb.find({});
    console.log(users, "users");
    return res.status(200).json({
      data: users,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const currentUser = user.find((i) => i.id == id);

    if (currentUser?.id)
      return res.status(200).json({
        data: currentUser,
      });

    return res.status(404).json({
      data: {},
      message: `can find user with id ${id}`,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const currentUser = user.find((i) => i.id === +id);
    if (!currentUser?.id) {
      return res.status(404).json({
        message: `user with ${id} not found`,
      });
    }
    const updatedUser = {
      ...currentUser,
      ...data,
    };

    const updatedData = user.filter((i) => i.id !== +id);
    const fullData = [...updatedData, updatedUser];

    await fs.writeFile("user.json", JSON.stringify(fullData, null, 2));
    return res.status(201).json({
      data: updatedUser,
      message: `user with ${id} updated!`,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const currentUser = user.find((i) => i.id === +id);

    if (!currentUser?.id) {
      return res.status(404).json({
        message: `user with ${id} not found`,
      });
    }
    const updatedData = user.filter((i) => i.id !== +id);

    await fs.writeFile("user.json", JSON.stringify(updatedData, null, 2));
    return res.status(204);
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
