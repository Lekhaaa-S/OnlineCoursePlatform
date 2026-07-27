const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, default: "" },
  description: { type: String, default: "" },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "General" },
    instructor: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modules: [moduleSchema],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
