// Enrollment Controller
//
// enrollCourse(req, res)
//   POST /api/enroll/enroll/:courseId (protected)
//   Response: { enrollment }
//
// getMyCourses(req, res)
//   GET /api/enroll/my-courses (protected)
//   Response: { enrollments: [{ _id, courseId: { _id, title }, enrolledAt }] }
//   IMPORTANT: courseId must be populated (not just ObjectId)
//
// updateProgress(req, res)
//   POST /api/enroll/progress/update (protected)
//   Body: { courseId, moduleIndex, lessonIndex }
//   Response: { progress }
//
// getProgress(req, res)
//   GET /api/enroll/progress/:courseId (protected)
//   Response: { completedLessons: [{ moduleIndex, lessonIndex }], percentage: 60 }
