import React from "react";
import "../styles/Courses.css";
function CourseItem({ name, image, profname, id }) {
	return (
		<div className="courseItem">
			<h1 className="text">{name} </h1>
		</div>
	);
}

export default CourseItem;
