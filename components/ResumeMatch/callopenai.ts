"use server";
import OpenAI from "openai";

const openai = new OpenAI();

interface CallOpenaiParams {
  resume: string;
  jobDescription: string;
}

export async function callOpenai({ resume, jobDescription }: CallOpenaiParams) {
  const prompt = `Your job is to give me a list of key words (such as techniques and skills) that I can add to my resume so that the resume matches the job description more.
      Please only give me a list of the keywords, separated by commas. The list should contain no more than 30 words.
      Here is my resume: ${resume}
      Here is the job description: ${jobDescription}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0].message?.content || "";
  const listOfKeywords = result.split(",").map((keyword) => keyword.trim());

  return listOfKeywords;
}
