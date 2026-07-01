'use client';

import dynamic from "next/dynamic";

// Disable Server-Side Rendering (SSR) for the client-side React Router SPA
const App = dynamic(() => import("../../src/App"), { ssr: false });

export default function Page() {
  return <App />;
}
