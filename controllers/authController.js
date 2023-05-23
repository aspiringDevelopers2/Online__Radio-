const User = require("./../models/userModel");
const catchAsync = require("./../helpers/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../helpers/errorObject");
const sendToken = (res, user) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };
  const token = signToken(user.id);
  res.cookie("jwts", token, cookieOptions);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    token,
    data: {
      user,
    },
  });
};
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(res, user);
});
exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name }).select("+password");
  const token = signToken(user.id);
  if (!user) return next(new AppError("This user does not exist", 404));
  if (!(await user.decrypts(password, user.password)))
    return next(new AppError("incorrect password"));
  sendToken(res, user);
});
exports.protected = catchAsync(async (req, res, next) => {
  let userToken;
  const token = req.headers.authorization.split(" ")[1];
  const cookie = req.cookies.jwts;
  if (token) userToken = token;
  if (cookie) userToken = cookie;
  console.log(userToken);
  if (!userToken)
    return next(
      new AppError(
        "You are not logged in please log in to gain access to this route",
        401
      )
    );
  const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("This user does not exist", 401));
  req.user = user;
  next();
});
