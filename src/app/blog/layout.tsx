import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container" role="main">
      <section className="section" aria-label="Blog post">
        {children}
      </section>
    </main>
  );
}
