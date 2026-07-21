import { useState, useEffect } from "react";

/**
 * useTheme — Light / Dark mode manager
 * - Reads `localStorage` for persisted preference
 * - Falls back to OS system preference on first visit
 * - Applies / removes the `dark` class on <html>
 * - Returns { theme: "light" | "dark", toggleTheme, setTheme }
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem("lush-theme");
    if (saved === "dark" || saved === "light") return saved;
    // 2. Fall back to system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("lush-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  const setTheme = (val) => setThemeState(val);

  return { theme, toggleTheme, setTheme };
}
