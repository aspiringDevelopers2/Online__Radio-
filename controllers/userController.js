const User = require("./../models/userModel");
const catchAsync = require("./../helpers/catchAsync");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    length: users.length,
    status: "success",
    statusCode: 200,
    data: {
      users,
    },
  });
});
