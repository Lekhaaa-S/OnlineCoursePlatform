const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("admin"), createCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

module.exports = router;
