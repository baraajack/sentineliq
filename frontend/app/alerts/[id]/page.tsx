import { getAlert } from "../../../lib/api";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {alert.title}
        </h1>

        <p className="text-gray-500">
          Alert ID: {alert.id}
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Severity:</strong> {alert.severity}
          </div>

          <div>
            <strong>Risk Score:</strong> {alert.risk_score}
          </div>

          <div>
            <strong>Status:</strong> {alert.status}
          </div>

          <div>
            <strong>Asset ID:</strong> {alert.asset_id}
          </div>

          <div>
            <strong>Source IP:</strong> {alert.source_ip ?? "-"}
          </div>

          <div>
            <strong>Username:</strong> {alert.username ?? "-"}
          </div>

          <div>
            <strong>Event Count:</strong> {alert.event_count}
          </div>

          <div>
            <strong>First Seen:</strong> {alert.first_seen_at}
          </div>

          <div>
            <strong>Last Seen:</strong> {alert.last_seen_at}
          </div>
        </div>
      </div>
      <AlertAIPanel alertId={alert.id} />
    </div>
  );
}

