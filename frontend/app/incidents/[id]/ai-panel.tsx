"use client";

import { useState } from "react";
import {
  summarizeIncident,
  generateIncidentReport,
} from "../../../lib/api";

export function IncidentAIPanel({ incidentId }: { incidentId: number }) {
  const [summary, setSummary] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  async function handleSummarize() {
    setLoadingSummary(true);

    try {
      const data = await summarizeIncident(String(incidentId));
      setSummary(data);
    } finally {
      setLoadingSummary(false);
    }
  }

  async function handleGenerateReport() {
    setLoadingReport(true);

    try {
      const data = await generateIncidentReport(String(incidentId));
      setReport(data);
    } finally {
      setLoadingReport(false);
    }
  }

  return (
    <section className="panel ai-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">AI Analyst</p>
          <h2 className="panel-title">AI incident analysis</h2>
          <p className="panel-description">
            Summarize case context or generate a structured incident report.
          </p>
        </div>
        <span className="system-pill">Report ready</span>
      </div>

      <div className="ai-card-grid">
        <div className="ai-chip">
          <p className="ai-chip-title">Case summary</p>
          <p className="ai-chip-detail">Condenses investigation context for handoff.</p>
        </div>
        <div className="ai-chip">
          <p className="ai-chip-title">Analyst recommendations</p>
          <p className="ai-chip-detail">Surfaces response actions from case evidence.</p>
        </div>
        <div className="ai-chip">
          <p className="ai-chip-title">Incident report generation</p>
          <p className="ai-chip-detail">Creates a structured report from existing data.</p>
        </div>
      </div>

      <div className="action-row">
        <button className="button" onClick={handleSummarize} disabled={loadingSummary}>
          {loadingSummary ? "Generating..." : "Summarize Incident"}
        </button>

        <button className="button" onClick={handleGenerateReport} disabled={loadingReport}>
          {loadingReport ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {summary && (
        <div className="ai-result">
          <h3>AI Summary</h3>
          <p><strong>Summary:</strong> {summary.summary}</p>
          <p><strong>Confidence:</strong> {summary.confidence}</p>

          <div>
            <strong>Evidence:</strong>
            <ul>
              {summary.evidence.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Recommended Actions:</strong>
            <ul>
              {summary.recommended_actions.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {report && (
        <div className="ai-result">
          <h3>Incident Report</h3>
          <p><strong>Report ID:</strong> {report.id}</p>
          <p><strong>Model:</strong> {report.model_name}</p>
          <pre className="report-block">{report.content}</pre>
        </div>
      )}
    </section>
  );
}
