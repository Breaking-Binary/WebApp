import React, {useState, useEffect} from "react";
import Axios from "axios";
import {courseList} from "../courseList";
import CourseItem from "../components/CourseItem";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
    const [listOfCourses, setListOfCourses] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/getUsers").then((res) => {
            setListOfCourses(res.data);
            console.log(res.data);
        });
    }, []);
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
