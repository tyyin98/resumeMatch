import { callOpenai } from "@/utils/callopenai";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const dummy = ["apple", "orange", "peach", "cucumber"];

export async function POST(req: Request) {
  const { resume, jobDescription, email } = await req.json();
  const supabase = createClient();
  //   console.log(resume, jobDescription);

  try {
    const { data, error } = await supabase
      .from("usage")
      .select("credits_left")
      .eq("userID", email)
      .single();

    // console.log(data);

    if (!data?.credits_left) {
      return new Response(JSON.stringify(["Out of credits"]));
    }

    const updatedCreditsLeft = data.credits_left - 1;

    const { data: whatever, error: whatever2 } = await supabase
      .from("usage")
      .update({ credits_left: updatedCreditsLeft })
      .eq("userID", email);

    revalidatePath("/profile");
    console.log("revalidated");

    const listOfKeywords = await callOpenai({ resume, jobDescription });

    return new Response(JSON.stringify(listOfKeywords), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

export function GET() {
  return new Response("GETTT");
}

// export function POST(request: Request) {}
