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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/logincomponent'
import SignUp from './components/signupcomponent'
import ForgotPassword from './components/ForgotPassword'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Breaking-Binary
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App