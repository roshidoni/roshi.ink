import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container" role="main">
      <section className="section" aria-label="Blog post">
        <nav aria-label="Breadcrumb" style={{ marginBottom: "0.75rem" }}>
          <a href="/" className="muted" style={{ textDecoration: "none" }}>
            ← Home
          </a>
        </nav>
        {children}
      </section>
    </main>
  );
}
