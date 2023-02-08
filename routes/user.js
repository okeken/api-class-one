const express = require("express");
const user = require("../user.json");

const userRouter = express.Router();

userRouter.get("/", async function (req, res) {
  return res.status(200).json({
    data: user,
  });
});

userRouter.post("/", async function (req, res) {
  const userName = req.body;
  console.log(userName);
  return res.status(201).json({
    data: `success! ${userName.name} created successfully`,
  });
});

module.exports = userRouter;
