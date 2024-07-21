import { getUserCredits } from "@/utils/supabase/getUserCredits";

export async function POST(req: Request) {
  const { email } = await req.json();
  const credits = await getUserCredits(email);

  return new Response(JSON.stringify(credits), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
