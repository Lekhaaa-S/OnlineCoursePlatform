const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get("/", (req, res) => {
  res.json({ message: "Online Course Platform API is running" });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enroll", require("./routes/enrollmentRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// Key Rules:
// - All responses: JSON
// - Error format: { message: "error text" } with correct HTTP status
// - Token expiry: 7 days
// - Admin seeding: Create first user manually in MongoDB with role: "admin"
// - Modules/Lessons: Embedded inside Course document
// - Progress percentage: (completedLessons / totalLessons) * 100

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
