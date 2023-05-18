const User = require("./../models/userModel");
const catchAsync = require("./../helpers/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../helpers/errorObject");
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    token,
    data: {
      user,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name }).select("+password");
  const token = signToken(user.id);
  if (!user) return next(new AppError("This user does not exist", 404));
  if (!(await user.decrypts(password, user.password)))
    return next(new AppError("incorrect password"));
  res.status(200).json({
    status: "success",
    statusCode: 200,
    token,
  });
});
