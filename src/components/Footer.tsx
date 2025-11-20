import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 text-center bg-slate-900 text-slate-200">
      <p>© {new Date().getFullYear()} EphoriaX. All rights reserved.</p>
    </footer>
  );
}