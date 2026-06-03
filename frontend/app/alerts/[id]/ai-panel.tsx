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
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">AI Analyst</h2>
          <p className="panel-description">
            Generate analyst-ready explanation, evidence, and response guidance.
          </p>
        </div>
      </div>

      <div className="action-row">
        <button className="button" onClick={handleExplain} disabled={loading}>
          {loading ? "Generating..." : "Explain with AI"}
        </button>
      </div>

      {result && (
        <div className="ai-result">
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>

          <div>
            <strong>Evidence:</strong>
            <ul>
              {result.evidence.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Recommended Actions:</strong>
            <ul>
              {result.recommended_actions.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
