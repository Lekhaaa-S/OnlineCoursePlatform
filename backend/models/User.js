// User Model
// Fields:
//   name: String (required)
//   email: String (required, unique, lowercase)
//   password: String (required, minlength 6, select: false)
//   role: "user" | "admin" (default: "user")
//   verified: Boolean (default: false)
//   avatar: String (default: "")
//   timestamps: true
// Pre-save hook: hash password with bcrypt
// Instance method: comparePassword(candidatePassword)
