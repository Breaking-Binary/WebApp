const mongoose = require("mongoose");
const Controller = require("../controllers/courseController");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
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
    },
    profName: {
      type: String,
    },
    profEmail: {
      type: String,
    },
    commitments: {
      type: [
        {
          commitmentType: {
            type: String,
            enum: ["LECTURE", "OFFICE HOURS", "TUTORIAL", "LABS"],
            required: true,
          },
          dayOfWeek: {
            // 1-Monday, 7-Sunday
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
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: false,
  },
  courses: {
    type: Controller.getCourses,
    required: false,
  },
});

module.exports = mongoose.model("Course", courseSchema);
module.exports = mongoose.model("User", userSchema);
