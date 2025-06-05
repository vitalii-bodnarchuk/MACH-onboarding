"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={"button"}
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}
