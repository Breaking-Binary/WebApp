import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Courses.css"; //Prob should make a separate css page for navbar but leaving it as is for now

function Navbar() {
	const [expandNavbar, setExpandNavbar] = useState(false);

	const location = useLocation(); //Get information about where we are in our website

	useEffect(() => {
		setExpandNavbar(false);
	}, [location]);

	return (
		<div className="navbar" id={expandNavbar ? "open" : "close"}>
			<div classNames="links">
				<Link to="/"> Home </Link>
				<Link to="/courses"> Courses </Link>
				<Link to="/syllabus"> Syllabus Upload </Link>
			</div>
		</div>
	);
}

export default Navbar;
