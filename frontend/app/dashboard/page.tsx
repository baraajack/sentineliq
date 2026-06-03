import { fetchAssets, fetchEvents } from "../../lib/api";
import { Badge, EmptyState, MetricCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

export default async function DashboardPage() {
  const assets = await fetchAssets();
  const events = await fetchEvents();

  const recentEvents = events.slice(0, 10);

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
                {recentEvents.map((event: any) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="page-stack">
          <Panel
            title="Alert Readiness"
            description="No generated alerts are available yet."
          >
            <EmptyState>No alerts available yet.</EmptyState>
          </Panel>

          <Panel
            title="Incident Activity"
            description="No incident cases have been opened."
          >
            <EmptyState>No incidents available yet.</EmptyState>
          </Panel>
        </div>
      </div>
    </main>
  );
}
