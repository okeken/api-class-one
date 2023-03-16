const catchErrors = (func, req, res) => {
  try {
    return func(req, res);
  } catch (e) {
    console.log(e, "Error occcurred");
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

module.exports = catchErrors;
