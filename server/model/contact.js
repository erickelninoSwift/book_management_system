const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      require: [true, "Please do not leave field empty"],
    },
    email: {
      type: String,
      require: [true, "Please do not leave email empty"],
      unique: true,
    },
    phone: {
      type: String,
      require: [true, "Please make sure you provided the Phone number"],
    },
    address: {
      type: String,
      require: [true, "Please make sure you provided the Address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", ContactSchema);
