const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// get all courses
const getCourses = async (req, res) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });

  res.status(200).json(courses);
};

// get a single course
const getCourse = async (req, res) => {
  const { id } = req.params;

  // checks valid course
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  // finds course
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

// create a new course
const createCourse = async (req, res) => {
  // add to the database
  console.log(req.body);
  try {
    const course = await Course.create(req.body);
    console.log("**********");
    console.log(course);
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  // check valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such course" });
  }

  // find by id and delete or return error
  const course = await Course.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(400).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such course" });
  }

  // updates the object found by id
  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!course) {
    return res.status(400).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
