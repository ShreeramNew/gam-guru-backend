const User = require("../models/User");

// Fetch All Registered Users
exports.getUsers = async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) ensures newly added students show up at the top
    const users = await User.find({}).sort({ createdAt: -1 });

    if (users.length > 0) {
      return res.json({
        message: "Successfully fetched all users!",
        users,
      });
    }

    return res.json({
      message: "No users found!",
      users: [],
    });
  } catch (error) {
    console.error("Fetch users internal failure:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
