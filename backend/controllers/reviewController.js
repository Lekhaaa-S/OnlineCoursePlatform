const Review = require("../models/Review");
const Enrollment = require("../models/Enrollment");

// POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;

    const enrolled = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (!enrolled) {
      return res
        .status(400)
        .json({ message: "You must be enrolled to review this course" });
    }

    const existing = await Review.findOne({
      userId: req.user._id,
      courseId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this course" });
    }

    const review = await Review.create({
      userId: req.user._id,
      courseId,
      rating,
      comment,
    });

    res.status(201).json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reviews/:courseId
exports.getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    res.json({
      reviews,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
