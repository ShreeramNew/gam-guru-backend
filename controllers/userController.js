const User = require('../models/User');

// Sync Data after Payment
exports.syncPayment = async (req, res) => {
  const { email, name, city, phone, moduleTitle } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.accessibleModules.includes(moduleTitle)) {
        user.accessibleModules.push(moduleTitle);
      }
    } else {
      user = new User({
        email,
        name,
        city,
        phone,
        accessibleModules: [moduleTitle]
      });
    }

    await user.save();
    res.status(200).json({ message: "Sync successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check Auth Status
exports.checkAuth = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        isRegistered: true,
        accessibleModules: user.accessibleModules
      });
    }
    res.json({ isRegistered: false, accessibleModules: [] });
  } catch (error) {
    res.status(500).json({ error: "Auth check failed" });
  }
};