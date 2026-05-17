const User = require("../models/User");

// Sync Data after Payment
exports.syncPayment = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    age,
    gender,
    occupation,
    city,
    phone,
    moduleTitle,
    countryCode,
    timezone,
    startSession,
    endSession, // CAPTURE NEW DATA
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists: Update their access list if this is a new module
      if (!user.accessibleModules.includes(moduleTitle)) {
        user.accessibleModules.push(moduleTitle);
      }
      // Optionally update profile info if it was missing
      if (!user.firstName) user.firstName = firstName;
      if (!user.lastName) user.lastName = lastName;
      user.countryCode=countryCode;
      user.timezone = timezone;
      user.startSession = startSession;
      user.endSession = endSession;
    } else {
      // New User: Create full profile
      user = new User({
        email,
        firstName,
        lastName,
        name:`${firstName} ${lastName}`,
        age,
        gender,
        occupation,
        timezone, // STORED
        startSession, // STORED
        endSession, // STORED
        city,
        countryCode,
        phone,
        accessibleModules: [moduleTitle],
      });
    }

    await user.save();
    res.status(200).json({ message: "Sync successful", user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Check Auth Statuz
exports.checkAuth = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        isRegistered: true,
        accessibleModules: user.accessibleModules,
      });
    }
    res.json({ isRegistered: false, accessibleModules: [] });
  } catch (error) {
    res.status(500).json({ error: "Auth check failed" });
  }
};
