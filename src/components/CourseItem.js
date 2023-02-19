import React from "react";
import "../styles/Courses.css";
function CourseItem({ name, image, profname, id }) {
	return (
		<div className="courseItem">
			{name} - course image:
			{image} {profname}
		</div>
	);
}

export default CourseItem;
