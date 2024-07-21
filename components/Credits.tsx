"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function Credits({ email }: { email: string | undefined }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const data = await fetch("/api/userdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const creditsLeft = await data.json();
        console.log(creditsLeft);
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
