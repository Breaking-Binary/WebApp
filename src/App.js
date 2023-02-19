import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Syllabus from "./pages/Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<header> Web Calendar App </header>
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
