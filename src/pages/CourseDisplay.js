import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import "../styles/CourseDisplay.css";

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
			<div className="info">
				{course_list
					.filter((courseElement, index) => index == id)
					.map((currentCourse) => {
						return (
							<div>
								<div>
									{" "}
									<h1 className="text-center"> {currentCourse.name}</h1>{" "}
								</div>
								<div className="text-left">
									<strong>Professor's Name: </strong> {currentCourse.profName}
								</div>
								<div>
									{" "}
									<strong> Professor's Email:</strong> {currentCourse.profEmail}
								</div>

								{currentCourse.commitments.map((commitment) => {
									return (
										<div className="">
											<div> Type of Class: {commitment.commitmentType} </div>
											<div> Recurring Times: {commitment.dayOfWeek} </div>
											<div> Duration: {commitment.duration} </div>
											<div> Time: {commitment.time} </div>
										</div>
									);
								})}
								<div className="text-center">
									{" "}
									<h3>ASSESSMENTS: </h3>{" "}
								</div>
								{currentCourse.evaluations.map((evaluation, index) => {
									return (
										<div className="text-center">
											<span>
												<strong>
													Evaluation
													{index + 1}:
												</strong>
											</span>
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
		</div>
	);
}

export default CourseDisplay;
