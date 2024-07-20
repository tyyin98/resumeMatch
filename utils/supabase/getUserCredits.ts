import { createClient } from "@/utils/supabase/server";
const supabase = createClient();

export async function getUserCredits(email: string | undefined) {
  const { data, error } = await supabase
    .from("usage")
    .select("credits_left")
    .eq("userID", email)
    .single();

  // console.log(`profile page`, email);
  return data?.credits_left;
}
