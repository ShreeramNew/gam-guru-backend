const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  city: String,
  phone: String,
  accessibleModules: [String],
  isRegistered: { type: Boolean, default: true }
}, { timestamps: true }); // Good practice to have timestamps

module.exports = mongoose.model('User', userSchema);