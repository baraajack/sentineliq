import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string[];
};

export function PageHeader({ eyebrow = "Security Operations", title, description, meta }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>

      {meta?.length ? (
        <div className="header-meta">
          {meta.map((item) => (
            <span className="system-pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

type MetricCardProps = {
  label: string;
  value: string | number;
  caption?: string;
};

export function MetricCard({ label, value, caption }: MetricCardProps) {
  return (
    <article className="metric-card">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      {caption ? <p className="metric-caption">{caption}</p> : null}
    </article>
  );
}

type PanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Panel({ title, description, action, children }: PanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">{title}</h2>
          {description ? <p className="panel-description">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>;
}

type BadgeTone =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "open"
  | "investigating"
  | "resolved"
  | "closed"
  | "enabled"
  | "disabled"
  | "false-positive"
  | "default";

export function normalizeBadgeTone(value?: string | boolean | null): BadgeTone {
  if (typeof value === "boolean") return value ? "enabled" : "disabled";

  const normalized = String(value ?? "default")
    .toLowerCase()
    .replaceAll("_", "-");

  if (
    normalized === "critical" ||
    normalized === "high" ||
    normalized === "medium" ||
    normalized === "low" ||
    normalized === "open" ||
    normalized === "investigating" ||
    normalized === "resolved" ||
    normalized === "closed" ||
    normalized === "enabled" ||
    normalized === "disabled" ||
    normalized === "false-positive"
  ) {
    return normalized;
  }

  return "default";
}

export function Badge({ children, tone }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge badge-${tone ?? "default"}`}>{children}</span>;
}
