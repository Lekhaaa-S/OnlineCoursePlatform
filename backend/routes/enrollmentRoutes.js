// Enrollment Routes
// All mounted at /api/enroll
//
// POST   /api/enroll/enroll/:courseId     → enrollmentController.enrollCourse   (protected)
// GET    /api/enroll/my-courses           → enrollmentController.getMyCourses    (protected)
// POST   /api/enroll/progress/update      → enrollmentController.updateProgress (protected)
// GET    /api/enroll/progress/:courseId   → enrollmentController.getProgress    (protected)

const express = require("express");
const router = express.Router();

// TODO: implement enrollment routes

module.exports = router;
