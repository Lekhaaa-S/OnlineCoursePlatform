// Enrollment Model
// Fields:
//   userId: ObjectId ref "User" (required)
//   courseId: ObjectId ref "Course" (required)
//   enrolledAt: Date (default: Date.now)
//   timestamps: true
// Unique index on (userId, courseId)
