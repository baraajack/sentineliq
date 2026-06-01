"use client";

import { useState } from "react";
import { explainAlert } from "../../../lib/api";

export function AlertAIPanel({ alertId }: { alertId: number }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleExplain() {
    setLoading(true);

    try {
      const data = await explainAlert(String(alertId));
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{
      marginTop: "24px",
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <h2 style={{ marginTop: 0 }}>AI Analyst</h2>

      <button onClick={handleExplain} disabled={loading}>
        {loading ? "Generating..." : "Explain with AI"}
      </button>

      {result && (
        <div style={{ marginTop: "16px" }}>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>

          <strong>Evidence:</strong>
          <ul>
            {result.evidence.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <strong>Recommended Actions:</strong>
          <ul>
            {result.recommended_actions.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}