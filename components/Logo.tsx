import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      {/* <img src="/Logo2.png" alt="Resume Match Logo" className="h-16 w-auto" /> */}
      <div className="text-4xl font-bold text-gray-900">Resume Match</div>
    </Link>
  );
}
