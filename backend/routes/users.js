const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// GET all users
userRouter.get("/", getUsers);

// GET a single user
userRouter.get("/:id", getUser);

// POST a new user
userRouter.post("/", createUser);

// DELETE a user
userRouter.delete("/:id", deleteUser);

// UPDATE a user
userRouter.patch("/:id", updateUser);

module.exports = userRouter;
