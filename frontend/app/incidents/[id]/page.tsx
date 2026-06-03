import { getIncident } from "../../../lib/api";
import { Badge, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../../components/ui";
import { IncidentAIPanel } from "./ai-panel";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function IncidentDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const incident = await getIncident(id);

  return (
    <main className="page-stack">
      <PageHeader
        title={incident.title}
        description={`Incident ID: ${incident.id}`}
        meta={["Incident detail", "AI assisted"]}
      />

      <Panel
        title="Incident Summary"
        description="Case context, assignment state, and response timeline."
      >
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Description</span>
            <span className="detail-value">{incident.description}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Severity</span>
            <span className="detail-value">
              <Badge tone={normalizeBadgeTone(incident.severity)}>
                {incident.severity}
              </Badge>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">
              <Badge tone={normalizeBadgeTone(incident.status)}>
                {incident.status}
              </Badge>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Assigned Analyst</span>
            <span className="detail-value">{incident.assigned_to_user_id ?? "Unassigned"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Created From Alert</span>
            <span className="detail-value mono">{incident.created_from_alert_id ?? "—"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Created</span>
            <span className="detail-value">{formatDate(incident.created_at)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Updated</span>
            <span className="detail-value">{formatDate(incident.updated_at)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Resolved</span>
            <span className="detail-value">{formatDate(incident.resolved_at)}</span>
          </div>
        </div>
      </Panel>

      <div className="overview-grid">
        <InfoCard
          description="Review severity, assignment, source alert, and response timeline before summarizing the case."
          label="Case"
          title="Investigation context"
        />
        <InfoCard
          description="Generate concise case summaries for analyst handoff and response alignment."
          label="AI"
          title="Analyst recommendations"
        />
        <InfoCard
          description="Produce a structured incident report from the current case without changing incident state."
          label="Report"
          title="Incident report generation"
        />
      </div>

      <IncidentAIPanel incidentId={incident.id} />
    </main>
  );
}
