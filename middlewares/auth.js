const jwt = require("jsonwebtoken");

const decodeToken = (req) => {
  const secret = process.env.SECRET;
  const token = req.header("Authorization");
  const userTokenArr = token ? token.split(" ") : [];
  const userToken = userTokenArr?.[1];
  if (!userToken) return null;
  const verify = jwt.verify(userToken, secret);
  return { userToken, currentUser: verify };
};
const verifyToken = (req, res, next) => {
  const secret = process.env.SECRET;
  const data = decodeToken(req);

  if (!data?.userToken) {
    throw res.status(403).json({
      status: false,
      message: "Access denied, no token provided",
    });
  }

  const verify = jwt.verify(data.userToken, secret);
  let currentTimestamp = Math.round(new Date().getTime() / 1000);
  if (currentTimestamp > verify.exp) {
    return res.status(403).json({
      status: false,
      message: "token expired, no token provided",
    });
  }
  req.user = verify.data;
  next();
};

const isSuperAdmin = (req, res, next) => {
  const user = decodeToken(req);
  const role = user.currentUser.data.role;
  if (role != "superAdmin") {
    throw res.status(403).json({
      message: "Not Authorized",
    });
  }
  req.user = user.currentUser;
  next();
};

module.exports = {
  verifyToken,
  decodeToken,
  isSuperAdmin,
};
