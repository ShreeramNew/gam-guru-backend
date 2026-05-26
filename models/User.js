const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    name: String, // Full Name
    age: Number,
    gender: String,
    occupation: String,
    city: String,
    countryCode: Number,
    phone: String,
    timezone: String, // ADDED
    startSession: String, // ADDED
    endSession: String, // ADDED
    accessibleModules: [String],
    isRegistered: { type: Boolean, default: true },
    amountPaid: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
