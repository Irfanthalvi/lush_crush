import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from '@/components/ui/sonner'; // ✅ use alias path if set, or use relative path

// ── Apply saved theme class before React mounts to prevent flash ──
(function () {
  const saved = localStorage.getItem("lush-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
})();


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
      <Toaster position="top-center" richColors />
  </StrictMode>
);
