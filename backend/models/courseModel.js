const mongoose = require("mongoose");

const evaluationsSchema = new mongoose.Schema({
  // course_ID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Course",
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  grade: Number,
  dueDate: {
    type: Date,
    required: true,
  },
});

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    evaluations: {
      type: [evaluationsSchema],
    },
    profName: {
      type: String,
    },
    profEmail: {
      type: String,
    },
    lectureTime: {
      type: String,
    },
    lectureLocation: {
      type: String,
    },
    tutorialTime: {
      type: String,
    },
    tutorialLocation: {
      type: String,
    },
    officeHours: {
      type: String,
    },
    officeLocation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
