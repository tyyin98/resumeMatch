import React from "react";
import Logo from "@/components/Logo";

export default function loading() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Logo />
        </div>
      </nav>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        LOADING...
      </div>
    </div>
  );
}
