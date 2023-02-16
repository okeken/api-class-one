const mongoose = require("mongoose");

// SELECT * FROM  db.user
// import db from "db"
//  const users = db.find({
  ///
//})
//
//
const connectDatabase = async () => {
  const dbUrl = process.env.DB_URL;
  try {
    const connect = await mongoose.connect(dbUrl);
    return connect;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  connectDatabase,
};
