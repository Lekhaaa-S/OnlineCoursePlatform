const express = require("express");
const router = express.Router();
const {
  updateProfile,
  changePassword,
  getAllUsers,
  getAdminStats,
  blockUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/admin/users", protect, authorize("admin"), getAllUsers);
router.get("/admin/stats", protect, authorize("admin"), getAdminStats);
router.put("/admin/block/:id", protect, authorize("admin"), blockUser);
router.delete("/admin/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
