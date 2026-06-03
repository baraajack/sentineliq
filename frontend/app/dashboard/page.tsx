import { fetchAssets, fetchEvents } from "../../lib/api";
import {
  Badge,
  EmptyState,
  InfoCard,
  MetricCard,
  normalizeBadgeTone,
  PageHeader,
  Panel,
  ProgressRow,
} from "../../components/ui";

export default async function DashboardPage() {
  const assets = await fetchAssets();
  const events = await fetchEvents();

  const recentEvents = events.slice(0, 10);
  const highSignalEvents = events.filter((event: any) =>
    ["critical", "high"].includes(String(event.severity ?? "").toLowerCase())
  );
  const usernames = new Set(events.map((event: any) => event.username).filter(Boolean));
  const sourceIps = new Set(events.map((event: any) => event.source_ip).filter(Boolean));
  const telemetryCoverage = assets.length
    ? Math.min(100, Math.round((sourceIps.size / assets.length) * 100))
    : events.length
      ? 50
      : 0;
  const signalQuality = events.length
    ? Math.max(20, Math.round(((events.length - highSignalEvents.length) / events.length) * 100))
    : 0;
  const readinessScore = Math.round(
    (Math.min(100, assets.length * 12) + Math.min(100, events.length * 5) + telemetryCoverage) / 3
  );

  const cards = [
    {
      label: "Total Assets",
      value: assets.length,
      caption: "Tracked infrastructure inventory",
    },
    {
      label: "Total Events",
      value: events.length,
      caption: "Normalized security telemetry",
    },
    {
      label: "Open Alerts",
      value: 0,
      caption: "Awaiting analyst triage",
    },
    {
      label: "Open Incidents",
      value: 0,
      caption: "Active investigation cases",
    },
  ];

  const statusCards = [
    {
      label: "AI",
      title: "AI Analyst Status",
      description: events.length
        ? "Event context is available for alert explanation and incident reporting workflows."
        : "AI workflows are ready once alert and incident context is available.",
    },
    {
      label: "SOAR",
      title: "Automation Status",
      description: "Response workflow is staged for analyst-approved next actions and report generation.",
    },
    {
      label: "Rules",
      title: "Detection Coverage",
      description: `${sourceIps.size} source ${sourceIps.size === 1 ? "IP" : "IPs"} observed across normalized events.`,
    },
    {
      label: "SOC",
      title: "SOC Readiness",
      description: `${readinessScore}% readiness based on current asset inventory and event signal.`,
    },
  ];

  return (
    <main className="page-stack">
      <PageHeader
        title="Security Operations Dashboard"
        description="Monitor the current state of telemetry, asset coverage, and investigation workload from one SOC command surface."
        meta={["Live view", "Normalized events", "Risk aligned"]}
      />

      <div className="metric-grid">
        {cards.map((card) => (
          <MetricCard
            key={card.label}
            label={card.label}
            value={card.value}
            caption={card.caption}
          />
        ))}
      </div>

      <div className="status-grid">
        {statusCards.map((card) => (
          <InfoCard
            description={card.description}
            key={card.title}
            label={card.label}
            title={card.title}
          />
        ))}
      </div>

      <div className="content-grid">
        <Panel
          title="Recent Security Events"
          description="Latest normalized events available for detection and correlation."
        >
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Source IP</th>
                  <th>Username</th>
                </tr>
              </thead>

              <tbody>
                {recentEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState>
                        <div>
                          <strong>No events available yet.</strong>
                          <p>Ingest logs to generate normalized security events.</p>
                        </div>
                      </EmptyState>
                    </td>
                  </tr>
                ) : (
                  recentEvents.map((event: any) => (
                    <tr key={event.id}>
                      <td className="cell-title">{event.event_type}</td>
                      <td>
                        <Badge tone={normalizeBadgeTone(event.severity)}>
                          {event.severity}
                        </Badge>
                      </td>
                      <td className="mono">{event.source_ip ?? "-"}</td>
                      <td>{event.username ?? "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="page-stack">
          <Panel
            title="Operational Signal"
            description="CSS-only readiness indicators derived from the current dashboard data."
          >
            <div className="panel-body">
              <ProgressRow
                detail={`${assets.length} assets tracked in inventory.`}
                label="Asset coverage"
                value={Math.min(100, assets.length * 12)}
              />
              <ProgressRow
                detail={`${events.length} normalized events available for detection review.`}
                label="Telemetry volume"
                value={Math.min(100, events.length * 5)}
              />
              <ProgressRow
                detail={`${usernames.size} observed ${usernames.size === 1 ? "identity" : "identities"} in event data.`}
                label="Identity context"
                value={Math.min(100, usernames.size * 15)}
              />
              <ProgressRow
                detail={`${highSignalEvents.length} high-priority events currently visible.`}
                label="Signal quality"
                value={signalQuality}
              />
            </div>
          </Panel>

          <Panel
            title="Alert Readiness"
            description="Generated alerts will appear after detection rules evaluate normalized events."
          >
            <EmptyState>
              <div>
                <strong>No alerts available yet.</strong>
                <p>Ingest logs to generate detection alerts and begin AI-assisted triage.</p>
              </div>
            </EmptyState>
          </Panel>

          <Panel
            title="Incident Activity"
            description="Incident workflow starts after alerts are promoted into investigations."
          >
            <EmptyState>
              <div>
                <strong>No incidents available yet.</strong>
                <p>Create incidents from alerts to begin investigation and report generation.</p>
              </div>
            </EmptyState>
          </Panel>
        </div>
      </div>
    </main>
  );
}
