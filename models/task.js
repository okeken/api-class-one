const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },

    isDone: {
      type: Boolean,
      //   required: true,
    },
  },

  { timestamps: true }
);

const task = mongoose.model("task", taskSchema);

module.exports = {
  taskDb: task,
};
