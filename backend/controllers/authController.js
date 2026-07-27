// Auth Controller
//
// register(req, res)
//   POST /api/auth/register
//   Body: { name, email, password }
//   Response: { token, user: { _id, name, email, role } }
//
// login(req, res)
//   POST /api/auth/login
//   Body: { email, password }
//   Response: { token, user: { _id, name, email, role } }
//
// getMe(req, res)
//   GET /api/auth/me (protected)
//   Response: { _id, name, email, role, avatar, verified }
//
// forgotPassword(req, res)
//   POST /api/auth/forgot-password
//   Body: { email }
//   Response: { message }
//
// resetPassword(req, res)
//   POST /api/auth/reset-password
//   Body: { token, password }
//   Response: { message }
