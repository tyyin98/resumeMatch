import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "@/components/ui/navbar";

export default async function profile() {
  async function getUserCredits(email: string | undefined) {
    const { data, error } = await supabase
      .from("usage")
      .select("credits_left")
      .eq("userID", email)
      .single();

    // console.log(`profile page`, email);
    return data?.credits_left;
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const credits = await getUserCredits(user?.email);
  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col">
        <div>profile</div>
        <div>email: {user.email}</div>
        <div>credits: {credits}</div>
      </div>
    </div>
  );
}
