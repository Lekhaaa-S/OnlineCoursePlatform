// generateToken(userId)
//   - Signs JWT with { id: userId }
//   - Uses process.env.JWT_SECRET
//   - Expires in process.env.JWT_EXPIRE (default: 7d)
//   - Returns token string
