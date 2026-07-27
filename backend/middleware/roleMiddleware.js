// Role Middleware
//
// authorize(...roles)
//   - Returns middleware that checks req.user.role
//   - If role not in allowed roles → 403 { message: "Access denied" }
//   - Usage: router.get("/admin/users", protect, authorize("admin"), handler)
