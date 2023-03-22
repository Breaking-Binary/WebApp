import React from "react";
import {useParams} from "react-router-dom";
import {courseList} from "../courseList";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function CourseDisplay() {
    const {id} = useParams();
    const course = courseList[id];
    return (
        <div>
            <Navbar/>
            <div> Course Name: {course.name} </div>
            <div> Professor: {course.profname}</div>
        </div>
    );
}

export default CourseDisplay;
