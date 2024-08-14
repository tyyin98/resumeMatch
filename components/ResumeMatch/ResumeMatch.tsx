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
      const response = await fetch("/api/processjd", {
        method: "PUT",
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
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Job Description here:</label>
          </div>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg resize-y"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full">
          <div className=" bg-slate-400 text-white rounded-full px-8 py-2 cursor-pointer hover:bg-gray-800">
            Submit
          </div>
        </button>
      </form>

      {keywords && (
        <div>
          <h2> Keywords:</h2>
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
