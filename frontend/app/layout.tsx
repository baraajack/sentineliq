import { GlobalStyles } from "./global-styles";
import { NavLinks } from "./nav-links";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles />
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">SIQ</div>
              <div>
                <p className="brand-title">SentinelIQ</p>
                <p className="brand-subtitle">SOC Analyst Platform</p>
              </div>
            </div>

            <NavLinks />

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
