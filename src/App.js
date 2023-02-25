import "./App.css";
import Home from "./pages/Courses";
import Login from "./pages/Login";
import Syllabus from "./pages/Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/courses" element={<Home />} />
					<Route path="/syllabus" element={<Syllabus />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
