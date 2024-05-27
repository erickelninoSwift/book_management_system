const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please do not leave field empty"],
    },
    email: {
      type: String,
      require: [true, "Please do not leae field empty"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please make sure you provided the password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
