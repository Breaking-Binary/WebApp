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
			{course_list
				.filter((courseElement, index) => index == id)
				.map((currentCourse) => {
					return (
						<div>
							<div> Professor's Name: {currentCourse.profName}</div>
							<div> Professor's Email: {currentCourse.profEmail}</div>
							{currentCourse.evaluations.map((evaluation, index) => {
								return (
									<div>
										<span> Evaluation {index + 1}: </span>
										<div> Name: {evaluation.evaluationName} </div>
										<div> Weight: {evaluation.weight} </div>
										<div> Grade: {evaluation.grade} </div>
										<div> Due Date: {evaluation.dueDate} </div>
									</div>
								);
							})}
							{/* <div> Assignments: {currentCourse.evaluations[0].grade} </div> */}
							<div> Course Identifier: {currentCourse._id}</div>
						</div>
					);
				})}
		</div>
	);
}

export default CourseDisplay;
