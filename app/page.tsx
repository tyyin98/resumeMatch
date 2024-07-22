import Header from "@/components/Header";
import Link from "next/link";

import Navbar from "@/components/navbar";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <Link className="flex justify-center" href="/protected">
            <div className=" inline-block  bg-black text-white rounded-full px-8 py-2 cursor-pointer hover:bg-gray-800">
              Start
            </div>
          </Link>
        </main>
      </div>
      {/* <Link href="/dummy">redirect</Link> */}

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
