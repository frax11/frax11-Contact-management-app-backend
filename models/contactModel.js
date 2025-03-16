const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  name: {
    type: String,
    required: [true,'Add the name'],
  },
  email: {
    type: String,
    required: [true,'Add the email'],
  },
  phone: {
    type: String,
    required: [true,'Add the phone number'],
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);