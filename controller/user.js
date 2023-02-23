const { UserDb } = require("../models/user");

const getAllUser = async (req, res) => {
  try {
    const users = await UserDb.find({});
    // deep clone
    const cloned = JSON.parse(JSON.stringify(users));
    const mapped = cloned.map((i) => ({
      ...i,
      hashedPassword: "",
    }));
    return res.status(200).json({
      data: mapped,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const currentUser = await UserDb.findOne({ _id: id });

    return res.status(404).json({
      data: currentUser,
      message: `cant find user with id ${id}`,
    });
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({
      error: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const findUser = await UserDb.findById(id);

    if (!findUser?._id) {
      return res.status(404).json({
        status: false,
        message: "cant find user",
      });
    }
    console.log(data);
    const updatedUser = await UserDb.updateOne({ $set: data });

    return res.status(201).json({
      data: updatedUser,
      message: `user with ${id} updated!`,
    });
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({
      error: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const currentUser = await UserDb.findOne({ _id: id });

    if (!currentUser?.id) {
      return res.status(404).json({
        message: `user with ${id} not found`,
      });
    }
    await UserDb.deleteOne({ _id: id });

    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
