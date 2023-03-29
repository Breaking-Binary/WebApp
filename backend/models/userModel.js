const mongoose = require("mongoose");
const Controller = require("../controllers/userController");
const courseModel = require("../models/courseModel");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    // This should be email
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
    // courses array holds ids of course objects
    courses: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
        required: false,
    },
});

module.exports = mongoose.model("User", userSchema);
