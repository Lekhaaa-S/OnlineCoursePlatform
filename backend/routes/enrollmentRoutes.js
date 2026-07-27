const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  getMyCourses,
  updateProgress,
  getProgress,
} = require("../controllers/enrollmentController");
const protect = require("../middleware/authMiddleware");

router.post("/enroll/:courseId", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
router.post("/progress/update", protect, updateProgress);
router.get("/progress/:courseId", protect, getProgress);

module.exports = router;
