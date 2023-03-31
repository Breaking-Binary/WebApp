/*import "./App.css";
import Home from "./pages/Courses";
import Login from "./pages/Login";
import Syllabus from "./pages/Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/courses" element={<Home />} />
					<Route path="/syllabus" element={<Syllabus />} />
					<Route path="/course/:id" element={<Course />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
*/
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CourseHome from "./pages/CourseHome";
import Course from "./pages/Course";
import Upload from "./pages/Upload";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/log-in" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/courses" element={<CourseHome />} />
				<Route path="/course/:id" element={<Course />} />
				<Route path="/upload" element={<Upload />} />
			</Routes>
		</Router>
	);
}

export default App;
