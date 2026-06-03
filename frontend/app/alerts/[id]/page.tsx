import { getAlert } from "../../../lib/api";
import { Badge, normalizeBadgeTone, PageHeader, Panel } from "../../../components/ui";
import { AlertAIPanel } from "./ai-panel";


type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AlertDetailsPage({
  params,
}: PageProps) {
  const alert = await getAlert((await params).id);

  return (
    <main className="page-stack">
      <PageHeader
        title={alert.title}
        description={`Alert ID: ${alert.id}`}
        meta={["Alert detail", "AI assisted"]}
      />

      <Panel
        title="Alert Summary"
        description="Triage context, affected entity data, and occurrence window."
      >
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Severity</span>
            <span className="detail-value">
              <Badge tone={normalizeBadgeTone(alert.severity)}>{alert.severity}</Badge>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Risk Score</span>
            <span className="detail-value">{alert.risk_score}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">
              <Badge tone={normalizeBadgeTone(alert.status)}>{alert.status}</Badge>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Asset ID</span>
            <span className="detail-value mono">{alert.asset_id}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Source IP</span>
            <span className="detail-value mono">{alert.source_ip ?? "-"}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Username</span>
            <span className="detail-value">{alert.username ?? "-"}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Event Count</span>
            <span className="detail-value">{alert.event_count}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">First Seen</span>
            <span className="detail-value">{alert.first_seen_at}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Last Seen</span>
            <span className="detail-value">{alert.last_seen_at}</span>
          </div>
        </div>
      </Panel>
      <AlertAIPanel alertId={alert.id} />
    </main>
  );
}
