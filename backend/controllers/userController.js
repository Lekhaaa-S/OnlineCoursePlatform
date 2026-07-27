const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const courses = await Course.find();
    const totalRevenue = courses.reduce((sum, c) => sum + c.price, 0) * totalEnrollments;

    res.json({ totalUsers, totalCourses, totalEnrollments, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/admin/block/:id
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verified = !user.verified;
    await user.save();

    res.json({ message: user.verified ? "User unblocked" : "User blocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/users/admin/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Enrollment.deleteMany({ userId: req.params.id });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
