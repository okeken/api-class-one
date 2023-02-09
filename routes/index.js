const express = require("express");
const user = require("../user.json");

const indexRouter = express.Router();

indexRouter.get("/", function (req, res) {
  return res.status(200).json({
    data: "Welcome to our api ",
    status: 200,
  });
});

module.exports = indexRouter;
