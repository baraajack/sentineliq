import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: "240px",
              padding: "24px",
              background: "#0f172a",
              color: "white",
            }}
          >
            <h2>SentinelIQ</h2>

            <nav style={{ display: "grid", gap: "12px", marginTop: "24px" }}>
              <Link href="/dashboard" style={{ color: "white" }}>Dashboard</Link>
              <Link href="/assets" style={{ color: "white" }}>Assets</Link>
              <Link href="/events" style={{ color: "white" }}>Events</Link>
              <Link href="/alerts" style={{ color: "white" }}>Alerts</Link>
              <Link href="/incidents" style={{ color: "white" }}>Incidents</Link>
            </nav>
          </aside>

          <main style={{ flex: 1, padding: "32px", background: "#f8fafc" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}