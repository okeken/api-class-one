// const http = require("http");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const countries = require("./countries");
const indexRouter = require("./routes");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const { connectDatabase } = require("./config/db");

// SQL  - postgress
// Non - SQL  - mongodb
const PORT = process.env.PORT || 5000;
const app = express();

async function main() {
  await connectDatabase();
  console.log("DB Connected successfully!");
}

main()
  .then(() => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use("/user", userRoute);
    app.use("/auth", authRoute);
    app.use("/", indexRouter);

    app.listen(PORT, () => {
      console.log(`App runnin on port ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
