import { fetchEvents } from "../../lib/api";
import { Badge, EmptyState, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <main className="page-stack">
      <PageHeader
        title="Security Events"
        description="Review normalized security telemetry before it is evaluated by detection rules and correlation logic."
        meta={[`${events.length} events`, "Telemetry stream"]}
      />

      <Panel
        title="Event Stream"
        description="Raw operational signal normalized for SOC review."
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Username</th>
                <th>Source IP</th>
                <th>Occurred At</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState>
                      <div>
                        <strong>No events available yet.</strong>
                        <p>Ingest logs to generate normalized security events for detection rules.</p>
                      </div>
                    </EmptyState>
                  </td>
                </tr>
              ) : (
                events.map((event: any) => (
                  <tr key={event.id}>
                    <td className="cell-title">{event.event_type}</td>
                    <td>{event.event_category}</td>
                    <td>
                      <Badge tone={normalizeBadgeTone(event.severity)}>
                        {event.severity}
                      </Badge>
                    </td>
                    <td>{event.username ?? "-"}</td>
                    <td className="mono">{event.source_ip ?? "-"}</td>
                    <td className="nowrap">{event.occurred_at}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="overview-grid">
        <InfoCard
          description="Events provide normalized source IP, identity, severity, and category fields for downstream detection."
          label="Telemetry"
          title="Normalized signal"
        />
        <InfoCard
          description="Detection rules evaluate event patterns and convert suspicious activity into alert context."
          label="Rules"
          title="Detection input"
        />
        <InfoCard
          description="Clean event data improves the quality of AI summaries, recommendations, and incident reports."
          label="AI"
          title="Analyst context"
        />
      </div>
    </main>
  );
}
