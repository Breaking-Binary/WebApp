const mongoose = require("mongoose");
const Controller = require("../controllers/courseController");

// Schema for course object
const courseSchema = new mongoose.Schema(
  {
    // Name of course
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Professor Name
    profName: {
      type: String,
    },
    // Professor email
    profEmail: {
      type: String,
      required: false,
    },
    // evaluations array holding evaluation object
    evaluations: {
      type: [
        {
          evaluationName: {
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
        },
      ],
      required: false,
    },
    // commitments array holds either Lecture, Office hours, Tutorial, or Labs
    commitments: {
      type: [
        {
          // Must be one of: "LECTURE", "OFFICE HOURS", "TUTORIAL", "LABS"
          commitmentType: {
            type: String,
            enum: ["LECTURE", "OFFICE HOURS", "TUTORIAL", "LABS"],
            required: true,
          },
          dayOfWeek: {
            // 1-Monday, 7-Sunday (must be an integer)
            type: Number,
            min: 1,
            max: 7,
            required: true,
            validate: {
              validator: Number.isInteger,
              message: "{VALUE} is not an integer value",
            },
          },
          time: { type: Number, required: true }, // Minutes from start of 00:00
          duration: { type: Number, required: true }, // Duration in minutes
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
