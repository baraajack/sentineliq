import { getDetectionRules } from "../../lib/api";

function badgeStyle(type: "severity" | "enabled", value: string | boolean) {
  if (type === "enabled") {
    return {
      background: value ? "#dcfce7" : "#f1f5f9",
      color: value ? "#166534" : "#475569",
      border: `1px solid ${value ? "#bbf7d0" : "#e2e8f0"}`,
    };
  }

  const severity = String(value).toLowerCase();

  if (severity === "high") {
    return {
      background: "#ffedd5",
      color: "#9a3412",
      border: "1px solid #fed7aa",
    };
  }

  if (severity === "medium") {
    return {
      background: "#fef9c3",
      color: "#854d0e",
      border: "1px solid #fde68a",
    };
  }

  return {
    background: "#f1f5f9",
    color: "#334155",
    border: "1px solid #e2e8f0",
  };
}

export default async function DetectionRulesPage() {
  const rules = await getDetectionRules();

  return (
    <div>
      <h1 style={{ margin: 0 }}>Detection Rules</h1>
      <p style={{ color: "#64748b", marginTop: "8px" }}>
        Rule-based detections used to generate SOC alerts from normalized events.
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
          <h2 style={{ margin: 0 }}>Rule Library</h2>
          <p style={{ color: "#64748b", margin: "6px 0 0" }}>
            Enabled rules are evaluated automatically during log ingestion.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
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
              {rules.map((rule: any) => (
                <tr key={rule.id}>
                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 600 }}>{rule.name}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
                      {rule.description}
                    </div>
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    {rule.rule_type}
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    <span
                      style={{
                        ...badgeStyle("severity", rule.severity),
                        borderRadius: "999px",
                        padding: "4px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {rule.severity}
                    </span>
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    {rule.risk_score}
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    <span
                      style={{
                        ...badgeStyle("enabled", rule.enabled),
                        borderRadius: "999px",
                        padding: "4px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {rule.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    {rule.threshold ?? "—"}
                  </td>

                  <td style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    {rule.aggregation_window_minutes
                      ? `${rule.aggregation_window_minutes} min`
                      : "—"}
                  </td>

                  <td
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #e2e8f0",
                      fontFamily: "monospace",
                      fontSize: "12px",
                    }}
                  >
                    {rule.rule_key}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}