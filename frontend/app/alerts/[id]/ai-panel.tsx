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
    <section className="panel ai-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">AI Analyst</p>
          <h2 className="panel-title">AI-assisted alert triage</h2>
          <p className="panel-description">
            Generate analyst-ready explanation, evidence, and response guidance.
          </p>
        </div>
        <span className="system-pill">Recommendations</span>
      </div>

      <div className="ai-card-grid">
        <div className="ai-chip">
          <p className="ai-chip-title">Alert explanation</p>
          <p className="ai-chip-detail">Summarizes why the detection matters.</p>
        </div>
        <div className="ai-chip">
          <p className="ai-chip-title">Evidence review</p>
          <p className="ai-chip-detail">Highlights supporting observables.</p>
        </div>
        <div className="ai-chip">
          <p className="ai-chip-title">Response guidance</p>
          <p className="ai-chip-detail">Returns analyst recommendations.</p>
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
