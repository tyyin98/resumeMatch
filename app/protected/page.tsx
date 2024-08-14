import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import ResumeMatch from "@/components/ResumeMatch/ResumeMatch";
import Navbar from "@/components/navbar";
import { getUserCredits } from "@/utils/supabase/supabaseCrud";
import { unstable_noStore as noStore } from "next/cache";
import ResumeMatchServer from "@/components/ResumeMatch/ResumeMatchServer";

export default async function ProtectedPage() {
  noStore();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // console.log(user.email);
  // const credits = getUserCredits(user.email);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <Navbar />
      </div>
      {/* <div>credits available: {credits}</div> */}

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex flex-col gap-6">
          <ResumeMatch email={user.email} />
          {/* <ResumeMatchServer email={user.email} /> */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
