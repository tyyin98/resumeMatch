"use server";
import OpenAI from "openai";

const openai = new OpenAI();

interface CallOpenaiParams {
  resume: string;
  jobDescription: string;
}

export async function callOpenai({ resume, jobDescription }: CallOpenaiParams) {
  const prompt = `Please have a look at the following job description. What kind of skills and techniques do you think I should have to be more competent for this role? Please give me a list of skills and techniques, separated by commas. The list should contain no more than 30 elements. Please be sure the list is separated by commas.
    
      Here is the job description: ${jobDescription}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0].message?.content || "";
  console.log(result);
  const listOfKeywords = result.split(",").map((keyword) => keyword.trim());
  const listOfKeywords2 = result.split("-").map((keyword) => keyword.trim());
  if (listOfKeywords.length > listOfKeywords2.length) {
    return listOfKeywords;
  }
  return listOfKeywords2;
}
