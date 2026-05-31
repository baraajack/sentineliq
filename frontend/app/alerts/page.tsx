import { getAlerts } from "../../lib/api";
import type { Alert } from "../../lib/types";

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

  if (alert.asset_id) return alert.asset_id.slice(0, 8);
  return "—";
}

function severityClass(severity: string) {
  const normalized = severity.toLowerCase();

  if (normalized === "critical") {
    return "bg-red-100 text-red-800 border-red-200";
  }

  if (normalized === "high") {
    return "bg-orange-100 text-orange-800 border-orange-200";
  }

  if (normalized === "medium") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "open") {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }

  if (normalized === "investigating") {
    return "bg-purple-100 text-purple-800 border-purple-200";
  }

  if (normalized === "resolved") {
    return "bg-green-100 text-green-800 border-green-200";
  }

  if (normalized === "false_positive") {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
        <p className="text-sm text-muted-foreground">
          Detection alerts generated from normalized security events.
        </p>
      </div>

      <section className="rounded-xl border bg-card shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Alert Queue</h2>
          <p className="text-sm text-muted-foreground">
            Review active and historical security alerts.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Risk Score</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Source IP</th>
                <th className="px-6 py-3 font-medium">Username</th>
                <th className="px-6 py-3 font-medium">Asset</th>
                <th className="px-6 py-3 font-medium">Event Count</th>
                <th className="px-6 py-3 font-medium">First Seen</th>
                <th className="px-6 py-3 font-medium">Last Seen</th>
              </tr>
            </thead>

            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    No alerts found.
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr key={alert.id} className="border-b last:border-0">
                    <td className="max-w-[280px] px-6 py-4 font-medium">
                      {alert.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityClass(
                          alert.severity,
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </td>

                    <td className="px-6 py-4 tabular-nums">
                      {alert.risk_score}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass(
                          alert.status,
                        )}`}
                      >
                        {alert.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono">
                      {alert.source_ip ?? "—"}
                    </td>

                    <td className="px-6 py-4">{alert.username ?? "—"}</td>

                    <td className="px-6 py-4">{formatAsset(alert)}</td>

                    <td className="px-6 py-4 tabular-nums">
                      {alert.event_count}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(alert.first_seen_at)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(alert.last_seen_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}