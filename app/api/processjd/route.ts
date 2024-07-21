import { callOpenai } from "@/utils/callopenai";
import { revalidatePath } from "next/cache";

import {
  getUserCredits,
  updateUserCredits,
} from "@/utils/supabase/supabaseCrud";

export const revalidate = true;

export async function POST(req: Request) {
  const { jobDescription, email } = await req.json();

  try {
    const credits = await getUserCredits(email);

    if (!credits) {
      return new Response(JSON.stringify(["Out of credits"]));
    }

    const updatedCreditsLeft = credits - 1;

    await updateUserCredits(updatedCreditsLeft, email);

    revalidatePath("/profile");

    const listOfKeywords = await callOpenai({ jobDescription });

    // console.log("revalidated");

    return new Response(JSON.stringify(listOfKeywords), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}
