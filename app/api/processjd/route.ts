import { callOpenai } from "@/utils/callopenai";
import { revalidatePath } from "next/cache";
import {
  getUserCredits,
  updateUserCredits,
} from "@/utils/supabase/supabaseCrud";

export async function POST(req: Request) {
  const { jobDescription, email } = await req.json();

  try {
    console.log("email:", email);
    const credits = await getUserCredits(email);
    console.log("data", credits);

    if (!credits) {
      return new Response(JSON.stringify(["Out of credits"]));
    }

    const updatedCreditsLeft = credits - 1;

    await updateUserCredits(updatedCreditsLeft, email);

    const listOfKeywords = await callOpenai({ jobDescription });

    revalidatePath("/profile", "page");
    console.log("revalidated");

    return new Response(JSON.stringify(listOfKeywords), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}
