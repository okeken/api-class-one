const { UserDb } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const random = require("crypto").randomBytes(256).toString("base64");
// console.log(random);

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;

  try {
    // check if user exists
    const user = await UserDb.findOne({ email });
    if (!user?.email) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid password",
      });
    }

    const deepClonedUser = JSON.parse(JSON.stringify(user));
    const accessToken = jwt.sign(
      {
        data: deepClonedUser,
      },
      secret,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      accessToken,
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

module.exports = {
  createUser,
  login,
};
