"use client";

import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function getUserCredits(email: string | undefined) {
  const { data, error } = await supabase
    .from("usage")
    .select("credits_left")
    .eq("userID", email)
    .single();

  if (error) {
    console.error("Error fetching credits:", error);
    return null;
  }

  return data?.credits_left;
}

export default function Credits({ email }: { email: string | undefined }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const creditsLeft = await getUserCredits(email);
        setCredits(creditsLeft);
      } catch (err) {
        // setError(err);
      }
      setLoading(false);
    };

    if (email) {
      fetchCredits();
    }
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching credits</div>;

  return <span>{credits}</span>;
}
