import { getIncidents } from "../../lib/api";

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function badgeStyle(type: "severity" | "status", value: string) {
  const normalized = value.toLowerCase();

  if (type === "severity") {
    if (normalized === "critical") return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" };
    if (normalized === "high") return { background: "#ffedd5", color: "#9a3412", border: "1px solid #fed7aa" };
    if (normalized === "medium") return { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a" };
  }

  if (type === "status") {
    if (normalized === "open") return { background: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe" };
    if (normalized === "investigating") return { background: "#ede9fe", color: "#5b21b6", border: "1px solid #ddd6fe" };
    if (normalized === "resolved") return { background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" };
    if (normalized === "closed") return { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" };
  }

  return { background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" };
}

function Badge({ children, style }: { children: string; style: React.CSSProperties }) {
  return (
    <span
      style={{
        ...style,
        borderRadius: "999px",
        padding: "4px 10px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

export default async function IncidentsPage() {
  const incidents = await getIncidents();

  return (
    <div>
      <h1 style={{ margin: 0 }}>Incidents</h1>
      <p style={{ color: "#64748b", marginTop: "8px" }}>
        Investigation cases created from SOC alerts.
      </p>

      <section
        style={{
          marginTop: "24px",
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0 }}>Incident Queue</h2>
          <p style={{ color: "#64748b", margin: "6px 0 0" }}>
            Track active investigations and incident status.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {["Title", "Severity", "Status", "Assigned Analyst", "Created From Alert", "Created"].map((header) => (
                  <th
                    key={header}
                    align="left"
                    style={{
                      padding: "14px 24px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#475569",
                      fontSize: "13px",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "32px 24px", color: "#64748b", textAlign: "center" }}>
                    No incidents found.
                  </td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                      <div style={{ fontWeight: 600 }}>{incident.title}</div>
                      <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
                        {incident.description}
                      </div>
                    </td>

                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                      <Badge style={badgeStyle("severity", incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>

                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                      <Badge style={badgeStyle("status", incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>

                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                      {incident.assigned_to_user_id ?? "Unassigned"}
                    </td>

                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                      {incident.created_from_alert_id ?? "—"}
                    </td>

                    <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>
                      {formatDate(incident.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}