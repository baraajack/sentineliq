import Link from "next/link";
import { PageHeader, Panel } from "../components/ui";

export default function HomePage() {
  return (
    <main className="page-stack">
      <PageHeader
        eyebrow="SentinelIQ"
        title="Security Operations Console"
        description="A focused workspace for monitoring assets, triaging security events, reviewing alerts, and tracking investigations."
        meta={["SOC workspace", "Threat telemetry", "Analyst ready"]}
      />

      <Panel
        title="Operational Modules"
        description="Navigate directly into the core SOC workflows."
      >
        <div className="compact-list">
          {[
            ["Dashboard", "/dashboard", "Executive security posture and recent activity."],
            ["Alerts", "/alerts", "Detection queue with severity and risk context."],
            ["Incidents", "/incidents", "Case tracking for active investigations."],
          ].map(([label, href, detail]) => (
            <Link className="signal-row" href={href} key={href}>
              <div>
                <p className="signal-label">{label}</p>
                <p className="signal-detail">{detail}</p>
              </div>
              <span className="system-pill">Open</span>
            </Link>
          ))}
        </div>
      </Panel>
    </main>
  );
}
