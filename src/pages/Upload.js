import React, { useState } from "react";
import Navbar from "../components/Navbar";

function SyllabusForm(props) {
	const [manualData, setManualData] = useState(null);

	const handleManualDataChange = (event) => {
		const { name, value } = event.target;
		setManualData({ ...manualData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(manualData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Field 1:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 2:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 3:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 4:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 5:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 6:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 7:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 8:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 9:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<div>
				<label>
					Field 10:
					<input type="text" name="field1" onChange={handleManualDataChange} />
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

function App() {
	const [file, setFile] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleManualDataSubmit = (manualData) => {
		console.log(manualData);
	};

	return (
		<div>
			<Navbar />
			<h1>Syllabus Upload Form</h1>
			<div>
				<label>
					Upload file:
					<input type="file" onChange={handleFileChange} />
				</label>
			</div>
			<div>
				<label>
					Enter information manually:
					<input type="checkbox" onChange={() => setShowForm(!showForm)} />
				</label>
			</div>
			{showForm && <SyllabusForm onSubmit={handleManualDataSubmit} />}
			{!showForm && (
				<button disabled={!file} onClick={() => console.log(file)}>
					Submit
				</button>
			)}
		</div>
	);
}

export default App;
