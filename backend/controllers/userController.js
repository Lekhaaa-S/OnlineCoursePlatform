// User Controller
//
// updateProfile(req, res)
//   PUT /api/users/profile (protected)
//   Body: { name, email }
//   Response: { user: { _id, name, email, role } }
//
// changePassword(req, res)
//   PUT /api/users/change-password (protected)
//   Body: { currentPassword, newPassword }
//   Response: { message }
//
// getAllUsers(req, res)
//   GET /api/users/admin/users (admin)
//   Response: { users: [{ _id, name, email, role, blocked }] }
//
// getAdminStats(req, res)
//   GET /api/users/admin/stats (admin)
//   Response: { totalUsers, totalCourses, totalRevenue, totalEnrollments }
//
// blockUser(req, res)
//   PUT /api/users/admin/block/:id (admin)
//   Response: { message }
//
// deleteUser(req, res)
//   DELETE /api/users/admin/:id (admin)
//   Response: { message }
