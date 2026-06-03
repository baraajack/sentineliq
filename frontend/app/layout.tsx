import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">SIQ</div>
              <div>
                <p className="brand-title">SentinelIQ</p>
                <p className="brand-subtitle">SOC Analyst Platform</p>
              </div>
            </div>

            <nav className="nav" aria-label="Primary navigation">
              <Link className="nav-link" href="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" href="/assets">
                Assets
              </Link>
              <Link className="nav-link" href="/events">
                Events
              </Link>
              <Link className="nav-link" href="/alerts">
                Alerts
              </Link>
              <Link className="nav-link" href="/incidents">
                Incidents
              </Link>
              <Link className="nav-link" href="/detection-rules">
                Detection Rules
              </Link>
            </nav>

            <div className="sidebar-status">
              <p className="sidebar-status-label">Platform Status</p>
              <p className="sidebar-status-value">Telemetry online</p>
            </div>
          </aside>

          <main className="main">
            <div className="page">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
