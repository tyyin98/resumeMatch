import React from "react";
import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-screen flex justify-between border-b border-b-foreground/10 h-16">
        <div className="w-screen flex justify-between items-center p-3 text-sm">
          <div className="pl-5">
            <Logo />
          </div>
        </div>
      </nav>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        LOADING...
      </div>
    </div>
  );
}
