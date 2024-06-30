"use client";
import React, { useState, FormEvent } from "react";

export default function ResumeMatch() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data = await response.json();

      setKeywords(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Keyword Generator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Resume:</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={10}
              cols={50}
            />
          </div>
          <div>
            <label>Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              cols={50}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {keywords && (
          <div>
            <h2>Keywords:</h2>
            <ul>
              {keywords.map((keyword: any, index: any) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
