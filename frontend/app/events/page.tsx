import { fetchEvents } from "../../lib/api";
import { Badge, EmptyState, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

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
                    <EmptyState>No events found.</EmptyState>
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
    </main>
  );
}
