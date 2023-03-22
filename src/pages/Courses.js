import React, {useState, useEffect} from "react";
import Axios from "axios";
import {courseList} from "../courseList";
import CourseItem from "../components/CourseItem";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
    const [course_list, set_course_list] = useState([]);

    Axios.get('http://localhost:4000/api/courses', {})
        .then(function (response) {
            console.log(response.data);
        })

    return (
        <div>
            <Navbar/>
            <div className="courseList">
                {courseList.map((course, index) => {
                    return (
                        <CourseItem
                            className="courseList"
                            name={course.name}
                            image={course.image}
                            profname={course.profname}
                            id={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
