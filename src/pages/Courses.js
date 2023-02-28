import React from "react";
import { courseList } from "../courseList";
import CourseItem from "../components/CourseItem";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
	return (
		<div>
			<Navbar />
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
