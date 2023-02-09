const user = require("../user.json");
const fs = require("fs/promises");

const createUser = async (req, res) => {
  try {
    const newUsers = [...user, req.body];
    await fs.writeFile("user.json", JSON.stringify(newUsers, null, 2));
    return res.status(201).json({
      data: `success! created successfully`,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    return res.status(200).json({
      data: user,
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
