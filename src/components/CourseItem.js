import React from "react";
import "../styles/Courses.css";
import {useNavigate} from "react-router-dom";

function CourseItem({name, profName, id}) {
    const navigate = useNavigate();

    return (
        <div
            className="courseItem"
            onClick={() => {
                navigate("/course/" + id);
            }}
        >
            <h1 className="text">{name} </h1>
            <h1> {profName}</h1>
        </div>
    );
}

export default CourseItem;
