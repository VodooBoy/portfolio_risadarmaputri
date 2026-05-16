"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // PERBAIKAN: Gunakan resolvedTheme, bukan theme
  const { resolvedTheme, setTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9"></div>;

  return (
    <button
      // PERBAIKAN: Cek resolvedTheme
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink hover:bg-ink/5 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}