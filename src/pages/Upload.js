import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/UploadFile.css";
import { getDocument } from "pdfjs-dist";
import axios from "axios";

function SyllabusForm({ onSubmit }) {
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
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const content = event.target.result;
      const pdf = await getDocument({ data: new Uint8Array(content) }).promise;
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

    const datePatterns = [
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(\s*,\s*\d{2,4})?\b/gi, // matches dates in the format "Month Day, Year" or "Month Day"
      /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi, // matches dates in the format "Weekday Month Day, Year"
    ];

    const keywordPatterns = [
      /\b(assignment|quiz|test|exam|lab|midterm)s?\b/gi, // matches any of the listed keywords, with optional pluralization
    ];

    function processTextFile(txtContent) {
      const dates = [];
      const events = [];

      // Find all the dates and keywords
      for (const pattern of [...datePatterns, ...keywordPatterns]) {
        const matches = txtContent.matchAll(pattern);
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

      dates.sort((a, b) => a.index - b.index);
      events.sort((a, b) => a.index - b.index);

      const output = [];

      for (const date of dates) {
        let keyword = "";

        // Look for a keyword on the same line as the date
        const lineStart = txtContent.lastIndexOf("\n", date.index) + 1;
        const lineEnd = txtContent.indexOf("\n", date.index);
        const line = txtContent.slice(
          lineStart,
          lineEnd > -1 ? lineEnd : undefined
        );
        const keywordMatch = line.match(keywordPatterns[0]);
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

      let matchName = txtContent.matchAll(patternName);

      for (const match of matchName) {
        console.log(match[1] + ": " + match[2]);
      }

      let patternEmail = /\b\w+@\w+\.uwo\.ca\b/;

      let matchEmail = txtContent.match(patternEmail);

      if (matchEmail) {
        let email = matchEmail[0];
        console.log("Email: " + email);
      }

      let patternTime = /(\d{1,2}:\d{2})(am|pm)?/g;

      let matchTime = txtContent.matchAll(patternTime);

      for (const match of matchTime) {
        let time = match[1] + (match[2] ? match[2] : "");
        console.log("Lecture Time: " + time);
      }

      let patternLoc = /at\s+([A-Z][a-z]*)(\s[A-Z][a-z]*)?\b/g;

      let matchLoc = txtContent.matchAll(patternLoc);

      for (const match of matchLoc) {
        let location = match[1];
        console.log("Location: " + location);
      }

      const lines = txtContent.split("\n");
      const lineWithEdition = lines.find((line) => line.includes("edition"));

      if (lineWithEdition) {
        console.log("Textbook:", lineWithEdition);
      }
    }
  }

  const handleAddLecture = () => {
    setLectureInfo((prev) => [
      ...prev,
      { date: "", time: "", duration: "", type: "" },
    ]);
  };

  const handleAddEvaluation = () => {
    setEvaluationInfo((prev) => [
      ...prev,
      { type: "", weightage: "", dueDate: "" },
    ]);
  };

  const handleLectureInfoChange = (index, field, value) => {
    setLectureInfo((prev) =>
      prev.map((lecture, i) =>
        i === index ? { ...lecture, [field]: value } : lecture
      )
    );
  };

  const handleEvaluationInfoChange = (index, field, value) => {
    setEvaluationInfo((prev) =>
      prev.map((evaluation, i) =>
        i === index ? { ...evaluation, [field]: value } : evaluation
      )
    );
  };

  const handleRemoveEvaluation = (index) => {
    setEvaluationInfo((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveLecture = (index) => {
    setLectureInfo((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!fileContent) {
    //   alert("Please upload a PDF file.");
    //   return;
    // }

    const data = {
      name: courseCode,
      profName: professorName,
      profEmail: professorEmail,
      lectureInfo: lectureInfo,
      evaluations: evaluationInfo,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/courses",
        data
      );
      console.log(response.data);
      alert("Syllabus information successfully uploaded.");

      axios
        .patch(`http://localhost:4000/api/users` + response.data._id, {
          courses: response.data._id,
        })
        .then((r) => {});
    } catch (error) {
      //console.error(error);
      alert("An error occurred while processing the syllabus information.");
    }
  };

  return (
    <div>
      <Navbar />
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
                        type="remove-button"
                        onClick={() => handleRemoveLecture(index)}
                      >
                        Remove Lecture
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <h3>Evaluation Information</h3>
                  <button type="eval-button" onClick={handleAddEvaluation}>
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
                        type="remove-button"
                        onClick={() => handleRemoveEvaluation(index)}
                      >
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
