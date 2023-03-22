import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function CourseDisplay() {
	const [course_list, setCourseList] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:4000/api/courses").then((res) => {
			setCourseList(res.data);
		});
	}, []);

	const { id } = useParams();
	const course = course_list[id];

	return (
		<div>
			<Navbar />
			{/* <div> {course_list[id].name}</div> */}
		</div>
	);
}

export default CourseDisplay;
