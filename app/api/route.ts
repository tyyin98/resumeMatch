import { callOpenai } from "@/components/ResumeMatch/callopenai";

const dummy = ["apple", "orange", "peach", "cucumber"];

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();
  console.log(resume, jobDescription);

  const listOfKeywords = await callOpenai({ resume, jobDescription });

  return new Response(JSON.stringify(listOfKeywords), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function GET() {
  return new Response("GETTT");
}

// export function POST(request: Request) {}
