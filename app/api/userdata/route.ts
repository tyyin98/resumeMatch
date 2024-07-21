import { getUserCredits } from "@/utils/supabase/supabaseCrud";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { email } = await req.json();
  //   console.log(email);
  const credits = await getUserCredits(email);

  return new Response(JSON.stringify(credits), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
