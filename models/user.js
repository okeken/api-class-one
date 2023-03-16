const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// enum StudentType {
//   staylite:0
//   freser:1
// }
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //   required: true,
    },
    role: {
      type: String,
      // enum: ["user", "admin", "superAdmin"],
      default: "user",
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
