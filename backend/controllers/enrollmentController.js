const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");
const Course = require("../models/Course");

// POST /api/enroll/enroll/:courseId
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      userId: req.user._id,
      courseId,
    });

    res.status(201).json({ enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/enroll/my-courses
exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate("courseId", "title thumbnail instructor price")
      .sort({ enrolledAt: -1 });

    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/enroll/progress/update
exports.updateProgress = async (req, res) => {
  try {
    const { courseId, moduleIndex, lessonIndex } = req.body;

    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (!enrollment) {
      return res.status(400).json({ message: "Not enrolled in this course" });
    }

    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        courseId,
        completedLessons: [{ moduleIndex, lessonIndex }],
      });
    } else {
      const alreadyCompleted = progress.completedLessons.some(
        (l) => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex
      );

      if (!alreadyCompleted) {
        progress.completedLessons.push({ moduleIndex, lessonIndex });
        await progress.save();
      }
    }

    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/enroll/progress/:courseId
exports.getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      userId: req.user._id,
      courseId,
    });

    if (!progress) {
      return res.json({ completedLessons: [], percentage: 0 });
    }

    const course = await Course.findById(courseId);
    let totalLessons = 0;
    if (course) {
      course.modules.forEach((mod) => {
        totalLessons += mod.lessons.length;
      });
    }

    const percentage =
      totalLessons > 0
        ? Math.round((progress.completedLessons.length / totalLessons) * 100)
        : 0;

    res.json({
      completedLessons: progress.completedLessons,
      percentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
