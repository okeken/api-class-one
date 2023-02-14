const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      //   required: true,
    },
    hashedPassword: {
      type: String,
    },
  },

  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = {
  UserDb: user,
};
//   export default user;
