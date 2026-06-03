import Link from "next/link";
import { InfoCard, Panel } from "../components/ui";

export default function HomePage() {
  const quickLinks = [
    ["Dashboard", "/dashboard", "Security posture, telemetry volume, and SOC readiness."],
    ["Alerts", "/alerts", "Detection queue for AI-assisted triage."],
    ["Incidents", "/incidents", "Investigation cases and report generation."],
    ["Assets", "/assets", "Inventory context for detection and response."],
  ];

  const flow = [
    ["Raw Logs", "Ingest source telemetry"],
    ["Security Events", "Normalize observables"],
    ["Detection Rules", "Evaluate signal"],
    ["Alerts", "Prioritize risk"],
    ["Incidents", "Coordinate response"],
    ["AI Analysis", "Generate guidance"],
    ["Automation", "Prepare actions"],
  ];

  return (
    <main className="page-stack">
      <section className="hero-panel">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">SentinelIQ</p>
            <h1 className="hero-title">AI-assisted security operations console</h1>
            <p className="hero-copy">
              Monitor telemetry, manage detection workflows, triage alerts, and
              move investigations toward analyst-ready recommendations from one
              focused SOC workspace.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/dashboard">
                Open Dashboard
              </Link>
              <Link className="button button-secondary" href="/alerts">
                Review Alerts
              </Link>
            </div>
          </div>

          <div className="hero-snapshot" aria-label="Platform snapshot">
            <div className="snapshot-row">
              <div>
                <p className="snapshot-label">Analyst Layer</p>
                <p className="snapshot-value">AI triage</p>
              </div>
              <span className="system-pill">Ready</span>
            </div>
            <div className="snapshot-row">
              <div>
                <p className="snapshot-label">Detection Surface</p>
                <p className="snapshot-value">Rules + events</p>
              </div>
              <span className="system-pill">SOC</span>
            </div>
            <div className="snapshot-row">
              <div>
                <p className="snapshot-label">Response Path</p>
                <p className="snapshot-value">Alerts to cases</p>
              </div>
              <span className="system-pill">SOAR-lite</span>
            </div>
          </div>
        </div>
      </section>

      <Panel
        title="Platform Overview"
        description="Core modules for security monitoring, triage, investigation, and automation readiness."
      >
        <div className="overview-grid panel-body">
          {[
            ["Telemetry Intake", "Normalize logs into security events for detection and investigation context.", "Data"],
            ["AI Analyst", "Generate alert explanations, evidence summaries, recommended actions, and incident reports.", "AI"],
            ["Response Workflow", "Create incident context from alerts and keep investigations aligned to severity and status.", "SOC"],
          ].map(([title, description, label]) => (
            <InfoCard description={description} key={title} label={label} title={title} />
          ))}
        </div>
      </Panel>

      <Panel title="Quick Links" description="Jump into the operational areas used most often during SOC review.">
        <div className="quick-grid">
          {quickLinks.map(([label, href, description]) => (
            <Link className="quick-link-card" href={href} key={href}>
              <div>
                <span className="info-card-label">Open module</span>
                <h3 className="quick-link-title">{label}</h3>
                <p className="quick-link-description">{description}</p>
              </div>
              <span className="quick-link-footer">Enter workspace</span>
            </Link>
          ))}
        </div>
      </Panel>

      <Panel
        title="Architecture Snapshot"
        description="How operational signal becomes analyst-ready response context."
      >
        <div className="flow-list">
          {flow.map(([title, detail], index) => (
            <div className="flow-step" key={title}>
              <span className="flow-index">{index + 1}</span>
              <p className="flow-title">{title}</p>
              <p className="flow-detail">{detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </main>
  );
}
