import { useState, useEffect } from "react";

/**
 * Returns true if the current window width is less than 768px (mobile).
 * Updates reactively on window resize.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}
