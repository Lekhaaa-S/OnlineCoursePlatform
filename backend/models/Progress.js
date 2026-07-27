// Progress Model
// Fields:
//   userId: ObjectId ref "User" (required)
//   courseId: ObjectId ref "Course" (required)
//   completedLessons: [{
//       moduleIndex: Number
//       lessonIndex: Number
//   }]
//   timestamps: true
// Unique index on (userId, courseId)
// Virtual: percentage = (completedLessons / totalLessons) * 100
