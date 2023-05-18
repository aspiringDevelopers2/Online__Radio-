const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    trim: true,
    select: false,
    minlength: [8, "The password should have atleast 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator(confirm) {
        return confirm === this.password;
      },
      message: "This doesn't match your password",
    },
  },
  role: {
    type: String,
    default: "user",
    trim: true,
    enum: ["user", "admin"],
  },
});
userSchema.pre("save", async function (next) {
  console.log("It is doing");
  if (!this.isModified()) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});
module.exports = mongoose.model("User", userSchema);
