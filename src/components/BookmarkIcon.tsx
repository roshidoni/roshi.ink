"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function BookmarkIcon() {
  const pathname = usePathname();

  // if caller passed variant, use it; otherwise derive from pathname
  const resolved = pathname?.startsWith("/bookmarks") ? "filled" : "outline";

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" className="w-6 h-6 cursor-pointer">
      {resolved === "outline" ? (
        <path
          d="M12 17L5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M18 2H6a2 2 0 0 0-2 2v17a1 1 0 0 0 .5.86L12 18.15l7.5 3.71A1 1 0 0 0 20 22V4a2 2 0 0 0-2-2z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}