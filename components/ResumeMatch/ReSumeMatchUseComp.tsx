"use client";

import { useCompletion } from "ai/react";

export default function ReSumeMatchUseComp() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
    });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <div>
        <button type="submit">Submit</button>
      </div>

      {isLoading ? (
        <>
          <div>Loading...</div> <div>Loading...</div>
          <div>Loading...</div>
          <div>Loading...</div>
          <div>Loading...</div>
          <div>Loading...</div>
        </>
      ) : null}
      <div>{completion}</div>
    </form>
  );
}
