import { getDetectionRules } from "../../lib/api";
import { Badge, EmptyState, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

export default async function DetectionRulesPage() {
  const rules = await getDetectionRules();

  return (
    <main className="page-stack">
      <PageHeader
        title="Detection Rules"
        description="Rule-based detections used to generate SOC alerts from normalized events, thresholds, and aggregation windows."
        meta={[`${rules.length} rules`, "Automated detection"]}
      />

      <Panel
        title="Rule Library"
        description="Enabled rules are evaluated automatically during log ingestion."
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Rule Type",
                  "Severity",
                  "Risk Score",
                  "Enabled",
                  "Threshold",
                  "Window",
                  "Rule Key",
                ].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <EmptyState>No detection rules found.</EmptyState>
                  </td>
                </tr>
              ) : (
                rules.map((rule: any) => (
                  <tr key={rule.id}>
                    <td>
                      <div className="cell-title">{rule.name}</div>
                      <div className="cell-description">{rule.description}</div>
                    </td>

                    <td>{rule.rule_type}</td>

                    <td>
                      <Badge tone={normalizeBadgeTone(rule.severity)}>
                        {rule.severity}
                      </Badge>
                    </td>

                    <td>{rule.risk_score}</td>

                    <td>
                      <Badge tone={normalizeBadgeTone(rule.enabled)}>
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </td>

                    <td>{rule.threshold ?? "—"}</td>

                    <td>
                      {rule.aggregation_window_minutes
                        ? `${rule.aggregation_window_minutes} min`
                        : "—"}
                    </td>

                    <td className="mono">{rule.rule_key}</td>
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
