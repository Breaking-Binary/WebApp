import React, {useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/UploadFile.css";
import {getDocument} from "pdfjs-dist";
import {Document, Page} from "react-pdf";
import axios from "axios";


function SyllabusForm({onSubmit}) {
    const [lectureInfo, setLectureInfo] = useState([]);
    const [evaluationInfo, setEvaluationInfo] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [schoolTerm, setSchoolTerm] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [professorEmail, setProfessorEmail] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [showInfoForm, setShowInfoForm] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader()
        fileReader.onload = async (event) => {
            const content = event.target.file;
            // <Document file={fileContent} options={{ workerSrc: pdfWorker }} />
            const pdf = await getDocument({data: new Uint8Array(content)}).promise;
            const txt = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join("");
                txt.push(pageText);
            }
            const txtContent = txt.join("\n");
            setFileContent(txtContent);
            processTextFile(txtContent);
        };
        setShowInfoForm(true);
        fileReader.readAsArrayBuffer(file);

        // Read the file contents as a string

        const datePatterns = [
            /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(\s*,\s*\d{2,4})?\b/gi, // matches dates in the format "Month Day, Year" or "Month Day"
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi, // matches dates in the format "Weekday Month Day, Year"
        ];

        const keywordPatterns = [
            /\b(assignment|quiz|test|exam|lab|midterm)s?\b/gi, // matches any of the listed keywords, with optional pluralization
        ];

        // Process the text data to find events and dates
        processTextFile(file);

        function processTextFile(file) {
            const dates = [];
            const events = [];

            // Find all the dates and keywords
            for (const pattern of [...datePatterns, ...keywordPatterns]) {
                const matches = String(file).matchAll(pattern);
                if (matches) {
                    for (const match of matches) {
                        if (datePatterns.includes(pattern)) {
                            dates.push(match);
                        } else {
                            events.push(match);
                        }
                    }
                }
            }

            // Sort the dates and events by index in the text
            dates.sort((a, b) => a.index - b.index);
            events.sort((a, b) => a.index - b.index);

            const output = [];

            // Find the keyword for each date
            for (const date of dates) {
                let keyword = "";

                // Look for a keyword on the same line as the date
                const lineStart = file.lastIndexOf("\n", date.index) + 1;
                const lineEnd = file.indexOf("\n", date.index);
                const line = file.slice(lineStart, lineEnd > -1 ? lineEnd : undefined);
                const keywordMatch = String(line).match(keywordPatterns[0]);
                if (keywordMatch) {
                    keyword = keywordMatch[0];
                } else {
                    // Look for the nearest keyword by character distance
                    let closestDist = Infinity;
                    for (const event of events) {
                        const dist = Math.abs(date.index - event.index);
                        if (dist < closestDist) {
                            closestDist = dist;
                            keyword = event[0];
                        }
                    }
                }

                output.push(`${date[0]} - ${keyword}`);
            }

            console.log("Dates and keywords found:", output);

            let patternName =
                /(Professor|Dr\.|Lecturer|Instructor|TA|Teaching Assistant|Dr|Prof\.?)\s+([A-Z][a-z]+ \b[A-Z][a-z]+)/g;
            let matchName = String(file).matchAll(patternName);

            for (const match of matchName) {
                console.log(match[1] + ": " + match[2]);
            }

            let patternEmail = /\b\w+@\w+\.uwo\.ca\b/gi;

            let matchEmail = String(file).matchAll(patternEmail);

            if (matchEmail) {
                let email = matchEmail[0];
                console.log("Email: " + email);
            }

            let patternTime = /(\d{1,2}:\d{2})(am|pm)?/g;

            let matchTime = String(file).matchAll(patternTime);

            for (const match of matchTime) {
                let time = match[1] + (match[2] ? match[2] : "");
                console.log("Lecture Time: " + time);
            }

            let patternLoc = /at\s+([A-Z][a-z]*)(\s[A-Z][a-z]*)?\b/g;

            let matchLoc = String(file).matchAll(patternLoc);

            for (const match of matchLoc) {
                let location = match[1];
                console.log("Location: " + location);
            }
        }
    };

    const handleAddLecture = () => {
        setLectureInfo((prev) => [
            ...prev,
            {date: "", time: "", duration: "", type: ""},
        ]);
    };

    const handleAddEvaluation = () => {
        setEvaluationInfo((prev) => [
            ...prev,
            {type: "", weightage: "", dueDate: ""},
        ]);
    };

    const handleLectureInfoChange = (index, field, value) => {
        setLectureInfo((prev) =>
            prev.map((lecture, i) =>
                i === index ? {...lecture, [field]: value} : lecture
            )
        );
    };

    const handleEvaluationInfoChange = (index, field, value) => {
        setEvaluationInfo((prev) =>
            prev.map((evaluation, i) =>
                i === index ? {...evaluation, [field]: value} : evaluation
            )
        );
    };

    const handleRemoveEvaluation = (index) => {
        setEvaluationInfo((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveLecture = (index) => {
        setLectureInfo((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (fileContent.trim()) {
            console.log("File content:", fileContent);
            const response = await fetch("/api/upload-txt", {
                method: "POST",
                body: fileContent,
            });
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Upload PDF Page</h2>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileUpload}
                        />
                    </div>
                    <div id="fileUploadSection">
                        <label htmlFor="editInformationCheckbox">
                            {fileContent.trim() && (
                                <input
                                    type="checkbox"
                                    checked={showInfoForm}
                                    id="editInformationCheckbox"
                                    onChange={() => setShowInfoForm(!showInfoForm)}
                                />
                            )}
                            {fileContent.trim() && <span>Edit Information</span>}
                        </label>

                        {showInfoForm ? (
                            <div>
                                <h3>Course Information</h3>
                                <div>
                                    <label htmlFor="courseName">Course Name</label>
                                    <input
                                        id="courseName"
                                        type="text"
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="courseCode">Course Code</label>
                                    <input
                                        id="courseCode"
                                        type="text"
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="schoolTerm">School Term</label>
                                    <input
                                        id="schoolTerm"
                                        type="text"
                                        value={schoolTerm}
                                        onChange={(e) => setSchoolTerm(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="professorName">Professor Name</label>
                                    <input
                                        id="professorName"
                                        type="text"
                                        value={professorName}
                                        onChange={(e) => setProfessorName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="professorEmail">Professor Email</label>
                                    <input
                                        id="professorEmail"
                                        type="text"
                                        value={professorEmail}
                                        onChange={(e) => setProfessorEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <h3>Lecture Information</h3>
                                    <button type="button" onClick={handleAddLecture}>
                                        Add Lecture
                                    </button>
                                    {lectureInfo.map((lecture, index) => (
                                        <div key={index}>
                                            <div>
                                                <label htmlFor={`lecture-date-${index}`}>Date</label>
                                                <input
                                                    id={`lecture-date-${index}`}
                                                    type="date"
                                                    value={lecture.date}
                                                    onChange={(e) =>
                                                        handleLectureInfoChange(
                                                            index,
                                                            "date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`lecture-time-${index}`}>Time</label>
                                                <input
                                                    id={`lecture-time-${index}`}
                                                    type="time"
                                                    value={lecture.time}
                                                    onChange={(e) =>
                                                        handleLectureInfoChange(
                                                            index,
                                                            "time",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`lecture-duration-${index}`}>
                                                    Duration (hours)
                                                </label>
                                                <select
                                                    id={`lecture-duration-${index}`}
                                                    value={lecture.duration}
                                                    onChange={(e) =>
                                                        handleLectureInfoChange(
                                                            index,
                                                            "duration",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">Select a duration</option>
                                                    <option value="0.5">0.5 hour</option>
                                                    <option value="1">1 hours</option>
                                                    <option value="1.5">1.5 hours</option>
                                                    <option value="2">2 hours</option>
                                                    <option value="2.5">2.5 hours</option>
                                                    <option value="3">3 hours</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor={`lecture-type-${index}`}>Type</label>
                                                <select
                                                    id={`lecture-type-${index}`}
                                                    value={lecture.type}
                                                    onChange={(e) =>
                                                        handleLectureInfoChange(
                                                            index,
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="Lecture">Lecture</option>
                                                    <option value="Tutorial">Tutorial</option>
                                                    <option value="Lab">Lab</option>
                                                </select>
                                            </div>
                                            <button
                                                type="button"
                                                name="remove-button"
                                                onClick={() => handleRemoveLecture(index)}
                                            >
                                                Remove Lecture
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3>Evaluation Information</h3>
                                    <button type="button" name="eval-button" onClick={handleAddEvaluation}>
                                        Add Evaluation
                                    </button>
                                    {evaluationInfo.map((evaluation, index) => (
                                        <div key={index}>
                                            <div>
                                                <label htmlFor={`evaluation-type-${index}`}>
                                                    Evaluation Name
                                                </label>
                                                <input
                                                    id={`evaluation-type-${index}`}
                                                    type="text"
                                                    value={evaluation.type}
                                                    onChange={(e) =>
                                                        handleEvaluationInfoChange(
                                                            index,
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`evaluation-weightage-${index}`}>
                                                    Weightage
                                                </label>
                                                <input
                                                    id={`evaluation-weightage-${index}`}
                                                    type="number"
                                                    value={evaluation.weightage}
                                                    onChange={(e) =>
                                                        handleEvaluationInfoChange(
                                                            index,
                                                            "weightage",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`evaluation-dueDate-${index}`}>
                                                    Due Date
                                                </label>
                                                <input
                                                    id={`evaluation-dueDate-${index}`}
                                                    type="date"
                                                    value={evaluation.dueDate}
                                                    onChange={(e) =>
                                                        handleEvaluationInfoChange(
                                                            index,
                                                            "dueDate",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                name="remove-button"
                                                onClick={() => handleRemoveEvaluation(index)}>
                                                Remove Evaluation
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit">Submit</button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SyllabusForm;
