import React from "react";
import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";

function CourseItem({ name, image, profname, id }) {
    const navigate = useNavigate();

    console.log("This is a test")
    return (
        <div
            className="courseItem"
            onClick={() => {
                navigate("/course/" + id);
            }}
        >
            <h1 className="text">{name} </h1>
        </div>
    );
}

export default CourseItem;
