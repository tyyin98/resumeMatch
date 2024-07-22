import React from "react";
import { redirect } from "next/navigation";

export default function page() {
  redirect("/profile");
  return <div>page</div>;
}
