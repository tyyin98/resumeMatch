import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "@/components/navbar";
import Credits from "@/components/Credits";
import { getUserCredits } from "@/utils/supabase/supabaseCrud";

export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

export default async function profile() {
  console.log("landed '/proile' ");

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
      <div className="w-full flex justify-center ">
        <div>
          <div>email: {user.email}</div>
          <div>
            credits: <Credits email={user?.email} />
          </div>
          <div>credits: {credits}</div>
        </div>
      </div>
    </div>
  );
}
