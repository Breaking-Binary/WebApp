const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    profName: {
      type: String,
    },
    profEmail: {
      type: String,
      required: false,
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
      required: false,
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
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
