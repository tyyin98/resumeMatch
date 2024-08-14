import React from "react";
import { decUserCredits } from "@/utils/supabase/supabaseCrud";

import { revalidatePath } from "next/cache";

export default async function ResumeMatchServer({
  email,
}: {
  email: string | undefined;
}) {
  async function handledatamutation(formData: FormData) {
    "use server";
    decUserCredits(email);
    revalidatePath("/protected");
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <form action={handledatamutation}>
        <button type="submit" className="w-full">
          <div className=" bg-slate-400 text-white rounded-full px-8 py-2 cursor-pointer hover:bg-gray-800">
            credits--
          </div>
        </button>
      </form>
    </div>
  );
}
