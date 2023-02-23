const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const secret = process.env.SECRET;
  const token = req.header("Authorization");
  const userTokenArr = token ? token.split(" ") : [];
  const userToken = userTokenArr?.[1];
  if (!userToken) {
    throw res.status(403).json({
      status: false,
      message: "Access denied, no token provided",
    });
  }

  const verify = jwt.verify(userToken, secret);
  let currentTimestamp = Math.round(new Date().getTime() / 1000);
  if (currentTimestamp > verify.exp) {
    throw res.status(403).json({
      status: false,
      message: "token expired, no token provided",
    });
  }
  req.user = verify.data;
  next();
};

module.exports = {
  verifyToken,
};
