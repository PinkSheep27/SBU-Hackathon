"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ProtectedNavButton({
  children = "Go to Dashboard",
  className = "mt-4 inline-block w-fit px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    // Simple client-side auth check.
    // Assumption: if localStorage has 'token' (or 'auth'), user is signed in.
    // Adjust key to match your real auth storage (cookie, localStorage key, etc.).
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      // The app route folder is named `Dashboard` (capital D).
      // Use the same path casing to avoid 404s on Next.js routes.
      router.push("/Dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
