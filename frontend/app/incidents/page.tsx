import Link from "next/link";
import { getIncidents } from "../../lib/api";
import { Badge, EmptyState, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

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
                    <EmptyState>
                      <div>
                        <strong>No incidents available yet.</strong>
                        <p>Create incidents from alerts to begin investigation and report generation.</p>
                      </div>
                    </EmptyState>
                  </td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <Link className="cell-title cell-title-link" href={`/incidents/${incident.id}`}>
                        {incident.title}
                      </Link>
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

      <div className="overview-grid">
        <InfoCard
          description="Use incident status, severity, and assignment context to keep response work visible."
          label="Response"
          title="Investigation workflow"
        />
        <InfoCard
          description="Incident details include AI summarization and structured report generation from existing case context."
          label="AI"
          title="Incident report generation"
        />
        <InfoCard
          description="Escalate from alert review into an incident when evidence requires ownership, tracking, or reporting."
          label="Next"
          title="Case readiness"
        />
      </div>
    </main>
  );
}
