const css = `
:root {
  color-scheme: dark;
  --background: #07111f;
  --background-soft: #0b1626;
  --surface: #0f1b2d;
  --surface-elevated: #142238;
  --surface-muted: #17283e;
  --border: rgba(148, 163, 184, 0.18);
  --border-strong: rgba(148, 163, 184, 0.28);
  --text: #e5edf7;
  --text-muted: #94a3b8;
  --text-subtle: #64748b;
  --accent: #38bdf8;
  --accent-strong: #22d3ee;
  --success: #34d399;
  --warning: #facc15;
  --danger: #fb7185;
  --critical: #f43f5e;
  --shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--background);
}

body {
  min-height: 100vh;
  margin: 0;
  background:
    radial-gradient(circle at 18% -8%, rgba(14, 165, 233, 0.16), transparent 34%),
    linear-gradient(135deg, #07111f 0%, #0a1423 42%, #08111d 100%);
  color: var(--text);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  width: 272px;
  height: 100vh;
  flex: 0 0 272px;
  border-right: 1px solid var(--border);
  background: rgba(6, 15, 28, 0.88);
  backdrop-filter: blur(20px);
  padding: 24px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px 24px;
  border-bottom: 1px solid var(--border);
}

.brand-mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.24), rgba(20, 184, 166, 0.12));
  color: #b6efff;
  font-weight: 800;
  letter-spacing: 0;
}

.brand-title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.1;
}

.brand-subtitle {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 12px;
}

.nav {
  display: grid;
  gap: 6px;
  margin-top: 24px;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 12px;
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 650;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}

.nav-link:hover,
.nav-link-active {
  border-color: rgba(56, 189, 248, 0.28);
  background: rgba(56, 189, 248, 0.1);
  color: #ffffff;
}

.nav-link-active::before {
  position: absolute;
  left: -19px;
  width: 3px;
  height: 24px;
  border-radius: 999px;
  background: var(--accent-strong);
  content: "";
}

.nav-link::after {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.38);
  content: "";
}

.nav-link-active::after {
  background: var(--accent-strong);
  box-shadow: 0 0 16px rgba(34, 211, 238, 0.72);
}

.sidebar-status {
  margin-top: 28px;
  border: 1px solid rgba(52, 211, 153, 0.22);
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.08);
  padding: 14px;
}

.sidebar-status-label {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
}

.sidebar-status-value {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 0;
  color: #d1fae5;
  font-size: 13px;
  font-weight: 700;
}

.sidebar-status-value::before {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--success);
  box-shadow: 0 0 18px rgba(52, 211, 153, 0.75);
  content: "";
}

.main {
  flex: 1;
  min-width: 0;
  padding: 28px;
}

.page {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
}

.page-stack {
  display: grid;
  gap: 22px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 0 4px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-strong);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-title {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  line-height: 1;
}

.page-description {
  max-width: 760px;
  margin: 12px 0 0;
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
}

.header-meta,
.hero-actions,
.ai-chip-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.header-meta {
  justify-content: flex-end;
}

.system-pill {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(15, 27, 45, 0.74);
  padding: 0 12px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.hero-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(20, 34, 56, 0.98), rgba(9, 20, 35, 0.98)),
    linear-gradient(90deg, rgba(56, 189, 248, 0.14), transparent);
  box-shadow: var(--shadow);
  padding: 34px;
}

.hero-panel::before {
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(52, 211, 153, 0.44), transparent);
  content: "";
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 30px;
  align-items: center;
}

.hero-title {
  max-width: 780px;
  margin: 0;
  color: #f8fafc;
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 850;
  line-height: 0.98;
}

.hero-copy {
  max-width: 720px;
  margin: 18px 0 0;
  color: #b6c5d8;
  font-size: 16px;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 24px;
}

.hero-snapshot {
  display: grid;
  gap: 12px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  background: rgba(5, 10, 20, 0.36);
  padding: 18px;
}

.snapshot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  padding-bottom: 11px;
}

.snapshot-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.snapshot-label {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.snapshot-value {
  margin: 4px 0 0;
  color: #f8fafc;
  font-size: 20px;
  font-weight: 800;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  border: 1px solid rgba(56, 189, 248, 0.36);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(14, 165, 233, 0.24), rgba(8, 145, 178, 0.18));
  color: #e0f2fe;
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  padding: 0 14px;
  transition: border-color 160ms ease, filter 160ms ease;
}

.button:hover:not(:disabled) {
  border-color: rgba(103, 232, 249, 0.72);
  filter: brightness(1.08);
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.button-secondary {
  border-color: rgba(148, 163, 184, 0.22);
  background: rgba(15, 27, 45, 0.72);
  color: #dbeafe;
}

.metric-grid,
.overview-grid,
.status-grid,
.quick-grid {
  display: grid;
  gap: 14px;
}

.metric-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.status-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.quick-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 18px;
}

.metric-card,
.panel,
.info-card,
.quick-link-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(20, 34, 56, 0.96), rgba(12, 24, 40, 0.96));
  box-shadow: var(--shadow);
}

.metric-card,
.info-card,
.quick-link-card {
  position: relative;
  overflow: hidden;
  padding: 18px;
}

.metric-card::before,
.info-card::before,
.quick-link-card::before {
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(52, 211, 153, 0.2), transparent);
  content: "";
}

.metric-card-success::before {
  background: linear-gradient(90deg, var(--success), rgba(56, 189, 248, 0.22), transparent);
}

.metric-card-warning::before {
  background: linear-gradient(90deg, var(--warning), rgba(56, 189, 248, 0.18), transparent);
}

.metric-card-danger::before {
  background: linear-gradient(90deg, var(--danger), rgba(56, 189, 248, 0.18), transparent);
}

.metric-label,
.info-card-label,
.detail-label {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metric-value {
  margin: 12px 0 0;
  color: #f8fafc;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
}

.metric-caption {
  margin: 10px 0 0;
  color: var(--text-subtle);
  font-size: 13px;
  line-height: 1.5;
}

.info-card-title,
.quick-link-title {
  margin: 12px 0 0;
  color: #f8fafc;
  font-size: 16px;
  font-weight: 800;
}

.info-card-description,
.quick-link-description {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.55;
}

.quick-link-card {
  display: grid;
  min-height: 148px;
  align-content: space-between;
  transition: border-color 160ms ease, transform 160ms ease, background 160ms ease;
}

.quick-link-card:hover {
  border-color: rgba(56, 189, 248, 0.42);
  background: linear-gradient(180deg, rgba(25, 43, 68, 0.98), rgba(13, 27, 45, 0.98));
  transform: translateY(-1px);
}

.quick-link-footer {
  margin-top: 18px;
  color: var(--accent-strong);
  font-size: 12px;
  font-weight: 800;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.7fr);
  gap: 18px;
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.panel {
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--border);
  padding: 18px 20px;
}

.panel-title {
  margin: 0;
  color: #f8fafc;
  font-size: 17px;
  font-weight: 800;
}

.panel-description {
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  min-width: 860px;
  border-collapse: collapse;
  color: #dbe7f3;
  font-size: 13px;
}

.data-table th {
  border-bottom: 1px solid var(--border);
  background: rgba(8, 17, 31, 0.72);
  color: #93a4b8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 12px 18px;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}

.data-table td {
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  padding: 15px 18px;
  vertical-align: top;
}

.data-table tr:last-child td {
  border-bottom: 0;
}

.data-table tbody tr {
  transition: background 160ms ease;
}

.data-table tbody tr:hover {
  background: rgba(56, 189, 248, 0.06);
}

.cell-title {
  display: block;
  max-width: 360px;
  color: #f1f5f9;
  font-weight: 750;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.cell-title-link {
  cursor: pointer;
  transition: color 160ms ease, text-decoration-color 160ms ease;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
}

.cell-title-link:hover {
  color: var(--accent-strong);
  text-decoration-color: rgba(34, 211, 238, 0.72);
}

.cell-description {
  max-width: 560px;
  margin-top: 5px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.mono {
  color: #cbd5e1;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 12px;
}

.nowrap {
  white-space: nowrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 24px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0 9px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge-critical {
  border-color: rgba(244, 63, 94, 0.34);
  background: rgba(244, 63, 94, 0.12);
  color: #fecdd3;
}

.badge-high {
  border-color: rgba(251, 146, 60, 0.34);
  background: rgba(251, 146, 60, 0.12);
  color: #fed7aa;
}

.badge-medium {
  border-color: rgba(250, 204, 21, 0.34);
  background: rgba(250, 204, 21, 0.12);
  color: #fef08a;
}

.badge-low,
.badge-default {
  border-color: rgba(148, 163, 184, 0.22);
  background: rgba(148, 163, 184, 0.1);
  color: #cbd5e1;
}

.badge-open {
  border-color: rgba(56, 189, 248, 0.34);
  background: rgba(56, 189, 248, 0.12);
  color: #bae6fd;
}

.badge-investigating {
  border-color: rgba(129, 140, 248, 0.36);
  background: rgba(129, 140, 248, 0.14);
  color: #c7d2fe;
}

.badge-resolved,
.badge-enabled {
  border-color: rgba(52, 211, 153, 0.32);
  background: rgba(52, 211, 153, 0.12);
  color: #bbf7d0;
}

.badge-closed,
.badge-disabled,
.badge-false-positive {
  border-color: rgba(148, 163, 184, 0.2);
  background: rgba(100, 116, 139, 0.12);
  color: #cbd5e1;
}

.empty-state {
  display: grid;
  place-items: center;
  min-height: 150px;
  padding: 34px 22px;
  color: var(--text-muted);
  text-align: center;
}

.empty-state > * {
  max-width: 460px;
}

.empty-state strong {
  display: block;
  margin-bottom: 6px;
  color: #e2e8f0;
  font-size: 14px;
}

.empty-state p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

.compact-list,
.flow-list {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.signal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 8px;
  background: rgba(8, 17, 31, 0.44);
  padding: 13px 14px;
}

.signal-label {
  margin: 0;
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 700;
}

.signal-detail {
  margin: 4px 0 0;
  color: var(--text-subtle);
  font-size: 12px;
  line-height: 1.45;
}

.flow-list {
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  overflow-x: auto;
}

.flow-step {
  position: relative;
  min-height: 104px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  background: rgba(8, 17, 31, 0.48);
  padding: 13px;
}

.flow-step:not(:last-child)::after {
  position: absolute;
  right: -11px;
  top: 50%;
  color: rgba(56, 189, 248, 0.7);
  content: ">";
  font-weight: 800;
  transform: translateY(-50%);
}

.flow-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: #bae6fd;
  font-size: 11px;
  font-weight: 800;
}

.flow-title {
  margin: 12px 0 0;
  color: #f1f5f9;
  font-size: 13px;
  font-weight: 800;
}

.flow-detail {
  margin: 5px 0 0;
  color: var(--text-subtle);
  font-size: 12px;
  line-height: 1.4;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 18px;
}

.detail-item {
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 8px;
  background: rgba(8, 17, 31, 0.44);
  padding: 14px;
}

.detail-value {
  display: block;
  margin-top: 7px;
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 18px;
}

.ai-panel {
  border-color: rgba(56, 189, 248, 0.24);
}

.ai-panel .panel-header {
  background: rgba(14, 165, 233, 0.05);
}

.ai-card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 18px 18px 0;
}

.ai-chip {
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  background: rgba(8, 17, 31, 0.42);
  padding: 12px;
}

.ai-chip-title {
  margin: 0;
  color: #e0f2fe;
  font-size: 12px;
  font-weight: 800;
}

.ai-chip-detail {
  margin: 5px 0 0;
  color: var(--text-subtle);
  font-size: 12px;
  line-height: 1.45;
}

.ai-result {
  display: grid;
  gap: 14px;
  border-top: 1px solid var(--border);
  padding: 18px;
}

.ai-result h3,
.ai-result p {
  margin: 0;
}

.ai-result h3 {
  color: #f8fafc;
  font-size: 15px;
}

.ai-result ul {
  margin: 8px 0 0;
  padding-left: 18px;
  color: #cbd5e1;
}

.ai-result li {
  margin-top: 6px;
}

.report-block {
  overflow-x: auto;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  background: rgba(5, 10, 20, 0.64);
  color: #dbeafe;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 12px;
  line-height: 1.6;
  padding: 16px;
  white-space: pre-wrap;
}

.progress-row {
  display: grid;
  gap: 8px;
}

.progress-row + .progress-row {
  margin-top: 16px;
}

.progress-row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #dbeafe;
  font-size: 13px;
  font-weight: 750;
}

.progress-row-header strong {
  color: #f8fafc;
  font-size: 12px;
}

.progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.16);
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
}

.progress-detail {
  margin: 0;
  color: var(--text-subtle);
  font-size: 12px;
  line-height: 1.45;
}

.panel-body {
  padding: 18px;
}

@media (max-width: 1180px) {
  .metric-grid,
  .status-grid,
  .quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .overview-grid,
  .ai-card-grid {
    grid-template-columns: 1fr;
  }

  .content-grid,
  .hero-grid,
  .two-column-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
    padding: 18px;
  }

  .nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .nav-link-active::before {
    display: none;
  }

  .sidebar-status {
    display: none;
  }

  .main {
    padding: 20px 14px;
  }

  .page-header {
    display: grid;
  }

  .header-meta {
    justify-content: flex-start;
  }

  .hero-panel {
    padding: 24px;
  }
}

@media (max-width: 560px) {
  .metric-grid,
  .status-grid,
  .quick-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    grid-template-columns: 1fr;
  }

  .panel-header {
    display: grid;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
`;

export function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
