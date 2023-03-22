import React, { useState, useEffect } from "react";
import Axios from "axios";
import CourseItem from "../components/CourseItem";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
	const [course_list, setCourseList] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:4000/api/courses").then((res) => {
			setCourseList(res.data);
		});
	}, [course_list]);

	return (
		<div>
			<Navbar />
			<div className="courseList">
				{course_list.map((course, index) => {
					return (
						<CourseItem
							className="courseList"
							name={course.name}
							profname={course.profName}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
