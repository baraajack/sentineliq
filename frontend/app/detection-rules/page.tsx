import { getDetectionRules } from "../../lib/api";
import { Badge, EmptyState, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

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
                    <EmptyState>
                      <div>
                        <strong>No detection rules available yet.</strong>
                        <p>Create rules to turn normalized events into prioritized alerts.</p>
                      </div>
                    </EmptyState>
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

      <div className="overview-grid">
        <InfoCard
          description="Enabled rules evaluate normalized event fields and thresholds during ingestion."
          label="Detection"
          title="Automated evaluation"
        />
        <InfoCard
          description="Risk score and severity help analysts understand alert priority before investigation."
          label="Priority"
          title="Risk alignment"
        />
        <InfoCard
          description="Rule keys and windows keep detection behavior traceable during SOC review."
          label="Audit"
          title="Operational context"
        />
      </div>
    </main>
  );
}
