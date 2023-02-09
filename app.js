// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const countries = require("./countries");
const indexRouter = require("./routes");
const userRoute = require("./routes/user");

const PORT = 5000;
const app = express();

// app.use("/", userRoute)

// M -Model, V - View C- Controller

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/user", userRoute);
app.use("/", indexRouter);

// loval/user/edit

app.listen(PORT, () => {
  console.log(`App runnin on port ${PORT}`);
});

// M - Model
// V - View
// C - Controller

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/json" });
//     res.write(JSON.stringify(countries));
//     res.end();
//   })
//   .listen(5000, () => {
//     console.log("App Listein on port 5000");
//   });
