"use server";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// export async function getUserCredits(email: string) {
//   return cache(async function getUserCredits(email: string | undefined) {
//     const supabase = createClient();
//     const { data, error } = await supabase
//       .from("usage")
//       .select("credits_left")
//       .eq("userID", email)
//       .single();
//     return data?.credits_left;
//   });
// }

export async function getUserCredits(email: string | undefined) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("usage")
    .select("credits_left")
    .eq("userID", email)
    .single();
  return data?.credits_left;
}

export async function updateUserCredits(
  newCredits: number,
  email: string | undefined
) {
  const supabase = createClient();
  try {
    await supabase
      .from("usage")
      .update({ credits_left: newCredits })
      .eq("userID", email);
  } catch (error) {
    return { error };
  }
}

export async function decUserCredits(email: string | undefined) {
  const supabase = createClient();

  const current_credits = await getUserCredits(email);
  const new_credits = current_credits - 1;

  await updateUserCredits(new_credits, email);
}
