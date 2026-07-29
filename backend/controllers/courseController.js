const Course = require("../models/Course");

// GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = { isPublished: true };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    let coursesQuery = Course.find(query);

    if (sort === "price_low") coursesQuery = coursesQuery.sort({ price: 1 });
    if (sort === "price_high") coursesQuery = coursesQuery.sort({ price: -1 });

    const courses = await coursesQuery;
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructorId: req.user._id,
    });

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
