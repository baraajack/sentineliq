import Link from "next/link";
import { getAlerts } from "../../lib/api";
import type { Alert } from "../../lib/types";
import { Badge, EmptyState, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatAsset(alert: Alert) {
  if (alert.asset?.hostname) return alert.asset.hostname;
  if (alert.asset?.ip_address) return alert.asset.ip_address;

  const fallbackAlert = alert as Alert & {
    asset_hostname?: string | null;
    asset_ip?: string | null;
  };

  if (fallbackAlert.asset_hostname) return fallbackAlert.asset_hostname;
  if (fallbackAlert.asset_ip) return fallbackAlert.asset_ip;

  if (alert.asset_id) return String(alert.asset_id);
  
  return "—";
}

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <main className="page-stack">
      <PageHeader
        title="Alert Queue"
        description="Review detections generated from normalized security events, prioritized by severity, risk, affected identity, and asset context."
        meta={[`${alerts.length} alerts`, "Triage ready"]}
      />

      <Panel
        title="Detection Alerts"
        description="Active and historical security alerts for analyst review."
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Severity</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Source IP</th>
                <th>Username</th>
                <th>Asset</th>
                <th>Event Count</th>
                <th>First Seen</th>
                <th>Last Seen</th>
              </tr>
            </thead>

            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={10}>
                    <EmptyState>
                      <div>
                        <strong>No alerts available yet.</strong>
                        <p>Ingest logs to generate detection alerts for AI-assisted triage.</p>
                      </div>
                    </EmptyState>
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>
                      <Link className="cell-title cell-title-link" href={`/alerts/${alert.id}`}>
                        {alert.title}
                      </Link>
                    </td>

                    <td>
                      <Badge tone={normalizeBadgeTone(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </td>

                    <td>
                      {alert.risk_score}
                    </td>

                    <td>
                      <Badge tone={normalizeBadgeTone(alert.status)}>
                        {alert.status}
                      </Badge>
                    </td>

                    <td className="mono">
                      {alert.source_ip ?? "—"}
                    </td>

                    <td>{alert.username ?? "—"}</td>

                    <td>{formatAsset(alert)}</td>

                    <td>
                      {alert.event_count}
                    </td>

                    <td className="nowrap">
                      {formatDate(alert.first_seen_at)}
                    </td>

                    <td className="nowrap">
                      {formatDate(alert.last_seen_at)}
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
          description="Review severity, source IP, identity, asset, and event count before escalating into incident response."
          label="Triage"
          title="AI-assisted triage"
        />
        <InfoCard
          description="Open an alert detail page to generate analyst recommendations without changing alert state."
          label="AI"
          title="Analyst recommendations"
        />
        <InfoCard
          description="Promote confirmed alerts into incidents when investigation ownership or reporting is required."
          label="Workflow"
          title="Next action"
        />
      </div>
    </main>
  );
}
