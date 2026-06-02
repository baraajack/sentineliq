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
    <section
      style={{
        marginTop: "24px",
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>AI Analyst</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={handleSummarize} disabled={loadingSummary}>
          {loadingSummary ? "Generating..." : "Summarize Incident"}
        </button>

        <button onClick={handleGenerateReport} disabled={loadingReport}>
          {loadingReport ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {summary && (
        <div style={{ marginTop: "16px" }}>
          <h3>AI Summary</h3>
          <p><strong>Summary:</strong> {summary.summary}</p>
          <p><strong>Confidence:</strong> {summary.confidence}</p>

          <strong>Evidence:</strong>
          <ul>
            {summary.evidence.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <strong>Recommended Actions:</strong>
          <ul>
            {summary.recommended_actions.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {report && (
        <div style={{ marginTop: "16px" }}>
          <h3>Incident Report</h3>
          <p><strong>Report ID:</strong> {report.id}</p>
          <p><strong>Model:</strong> {report.model_name}</p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            {report.content}
          </pre>
        </div>
      )}
    </section>
  );
}