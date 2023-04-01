// import bodyParser from 'body-parser';

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");

// express app
const app = express();

var cors = require("cors");
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

// connect to db
mongoose.set("strictQuery", true); //Ensures queries follow schema
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database");
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
