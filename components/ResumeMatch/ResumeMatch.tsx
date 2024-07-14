"use client";
import React, { useState, FormEvent } from "react";

export default function ResumeMatch({ email }: { email: string | undefined }) {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeywords([]);

    setIsLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume, jobDescription, email }),
      });

      const data = await response.json();

      setKeywords(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full ">
      <h1>Resume Keyword Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <div>
            <label className="w-full">Resume:</label>
          </div> */}

          {/* <textarea
            className="w-full  p-4 border border-gray-300 rounded-lg resize-y"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          /> */}
        </div>
        <div>
          <div>
            <label>Job Description:</label>
          </div>
          <textarea
            className="w-full  p-4 border border-gray-300 rounded-lg resize-y"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {keywords && (
        <div>
          <h2>Keywords:</h2>
          {isLoading ? <div>Loading...</div> : null}
          <ul>
            {keywords.map((keyword: any, index: any) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
