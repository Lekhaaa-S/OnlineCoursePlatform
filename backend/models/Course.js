// Course Model
// Fields:
//   title: String (required, trim)
//   description: String (required)
//   price: Number (required)
//   thumbnail: String (default: "")
//   category: String (default: "General")
//   instructor: String (required)
//   instructorId: ObjectId ref "User"
//   isPublished: Boolean (default: false)
//   modules: [{
//       title: String (required)
//       lessons: [{
//           title: String
//           videoUrl: String
//           description: String
//       }]
//   }]
//   timestamps: true
