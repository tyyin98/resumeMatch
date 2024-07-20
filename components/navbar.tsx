import React from "react";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <>
      <nav className="w-screen flex justify-between border-b border-b-foreground/10 h-16">
        <div className="w-screen flex justify-between items-center p-3 text-sm">
          <div className="pl-5">
            <Logo />
          </div>

          <div className="pr-4">{isSupabaseConnected && <AuthButton />}</div>
        </div>
      </nav>
    </>
  );
}
