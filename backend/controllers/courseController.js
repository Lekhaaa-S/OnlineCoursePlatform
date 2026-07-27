// Course Controller
//
// getAllCourses(req, res)
//   GET /api/courses
//   Query: ?search=react&category=Web+Development&sort=price_low
//   Response: { courses: [{ _id, title, description, price, category, instructor, thumbnail, modules }] }
//
// getCourseById(req, res)
//   GET /api/courses/:id
//   Response: { _id, title, description, price, category, instructor, thumbnail,
//              modules: [{ title, lessons: [{ title, videoUrl, description }] }] }
//
// createCourse(req, res)
//   POST /api/courses (admin)
//   Body: { title, description, price, category, instructor, thumbnail, modules }
//   Response: { course }
//
// updateCourse(req, res)
//   PUT /api/courses/:id (admin)
//   Body: { title, description, price, category, instructor, thumbnail, modules }
//   Response: { course }
//
// deleteCourse(req, res)
//   DELETE /api/courses/:id (admin)
//   Response: { message }
