import { createClient } from "@/utils/supabase/server";

export async function getUserCredits(email: string | undefined) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("usage")
    .select("credits_left")
    .eq("userID", email)
    .single();

  // console.log(`profile page`, email);
  console.log("helllll", data?.credits_left);
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
