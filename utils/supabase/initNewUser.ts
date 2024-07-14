// utils/addUsage.js
import { createClient } from "@/utils/supabase/server";

export const initNewUser = async (email: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("usage")
      .insert([{ userID: email, credits_left: 100 }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error adding usage:", error);
    return null;
  }
};
