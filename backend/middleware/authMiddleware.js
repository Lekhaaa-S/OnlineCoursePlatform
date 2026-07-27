// Auth Middleware
//
// protect(req, res, next)
//   - Extracts token from Authorization: Bearer <token>
//   - Verifies JWT with process.env.JWT_SECRET
//   - Attaches req.user = await User.findById(decoded.id)
//   - Returns 401 { message: "Not authorized" } if no token or invalid
