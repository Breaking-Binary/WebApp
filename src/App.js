/*import "./App.css";
import Home from "./pages/Courses";
import Login from "./pages/Login";
import Syllabus from "./pages/Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDisplay from "./pages/CourseDisplay";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/courses" element={<Home />} />
					<Route path="/syllabus" element={<Syllabus />} />
					<Route path="/course/:id" element={<CourseDisplay />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
*/
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import Courses from "./pages/Courses";
import CourseDisplay from "./pages/CourseDisplay";

function App() {
    return (
        <Router>
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route path="/log-in" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/courses" element={<Courses/>}/>
                    <Route path="/courses/:id" element={<CourseDisplay/>}/>
                </Routes>
        </Router>
    )
}

export default App
