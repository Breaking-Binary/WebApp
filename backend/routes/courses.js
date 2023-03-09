const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

const courseRouter = express.Router();

// GET all courses
courseRouter.get("/", getCourses);

// GET a single course
courseRouter.get("/:id", getCourse);

// POST a new course
courseRouter.post("/", createCourse);

// DELETE a course
courseRouter.delete("/:id", deleteCourse);

// UPDATE a course
courseRouter.patch("/:id", updateCourse);

module.exports = courseRouter;
