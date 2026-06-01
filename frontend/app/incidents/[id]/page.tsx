import { getIncident } from "../../../lib/api";

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
    <div>
      <h1 style={{ margin: 0 }}>{incident.title}</h1>
      <p style={{ color: "#64748b", marginTop: "8px" }}>
        Incident ID: {incident.id}
      </p>

      <section
        style={{
          marginTop: "24px",
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Incident Summary</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          <div><strong>Description:</strong> {incident.description}</div>
          <div><strong>Severity:</strong> {incident.severity}</div>
          <div><strong>Status:</strong> {incident.status}</div>
          <div><strong>Assigned Analyst:</strong> {incident.assigned_to_user_id ?? "Unassigned"}</div>
          <div><strong>Created From Alert:</strong> {incident.created_from_alert_id ?? "—"}</div>
          <div><strong>Created:</strong> {formatDate(incident.created_at)}</div>
          <div><strong>Updated:</strong> {formatDate(incident.updated_at)}</div>
          <div><strong>Resolved:</strong> {formatDate(incident.resolved_at)}</div>
        </div>
      </section>
    </div>
  );
}