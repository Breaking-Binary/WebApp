import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/UploadFile.css";


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
    fileReader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      setShowInfoForm(true);
    };
    fileReader.readAsText(file);
  };

  const handleAddLecture = () => {
    setLectureInfo((prev) => [      ...prev,      { date: "", time: "", duration: "", type: "" },    ]);
  };

  const handleAddEvaluation = () => {
    setEvaluationInfo((prev) => [      ...prev,      { type: "", weightage: "", dueDate: "" },    ]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileContent.trim()) {
      console.log("File content:", fileContent);
    } else {
      onSubmit({
        courseName,
        courseCode,
        schoolTerm,
        professorName,
        professorEmail,
        lectureInfo,
        evaluationInfo,
      });
    }
  };  
  

  return (
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
                        handleLectureInfoChange(index, "date", e.target.value)
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
                        handleLectureInfoChange(index, "time", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor={`lecture-duration-${index}`}>
                      Duration (minutes):
                    </label>
                    <input
                      id={`lecture-duration-${index}`}
                      type="number"
                      value={lecture.duration}
                      onChange={(e) =>
                        handleLectureInfoChange(
                          index,
                          "duration",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor={`lecture-type-${index}`}>Type</label>
                    <input
                      id={`lecture-type-${index}`}
                      type="text"
                      value={lecture.type}
                      onChange={(e) =>
                        handleLectureInfoChange(index, "type", e.target.value)
                      }
                    />
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
                    <label htmlFor={`evaluation-type-${index}`}>Type</label>
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
  );
}

export default SyllabusForm;
