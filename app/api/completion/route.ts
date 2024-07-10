import { StreamingTextResponse, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  let { prompt }: { prompt: string } = await req.json();

  prompt = `Have a look at the job descrition. Give me a list of skills that is important to get the job. Each word will occupy one line. Here is the job descrition:   ${prompt}`;

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt,
  });

  return new StreamingTextResponse(result.toAIStream());
}
