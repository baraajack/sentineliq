import { getIncidents } from "../../lib/api";
import { Badge, EmptyState, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function IncidentsPage() {
  const incidents = await getIncidents();

  return (
    <main className="page-stack">
      <PageHeader
        title="Incident Response"
        description="Track investigation cases created from SOC alerts, analyst ownership, escalation state, and evidence context."
        meta={[`${incidents.length} cases`, "Response workflow"]}
      />

      <Panel
        title="Incident Queue"
        description="Active and historical investigations with assignment and source alert context."
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {["Title", "Severity", "Status", "Assigned Analyst", "Created From Alert", "Created"].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState>No incidents found.</EmptyState>
                  </td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <div className="cell-title">{incident.title}</div>
                      <div className="cell-description">
                        {incident.description}
                      </div>
                    </td>

                    <td>
                      <Badge tone={normalizeBadgeTone(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>

                    <td>
                      <Badge tone={normalizeBadgeTone(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>

                    <td>
                      {incident.assigned_to_user_id ?? "Unassigned"}
                    </td>

                    <td className="mono">
                      {incident.created_from_alert_id ?? "—"}
                    </td>

                    <td className="nowrap">
                      {formatDate(incident.created_at)}
                    </td>
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
