export type Alert = {
  id: number;
  title: string;
  severity: string;
  risk_score: number;
  status: string;
  source_ip?: string | null;
  username?: string | null;
  asset_id?: number | null;
  event_count: number;
  first_seen_at: string;
  last_seen_at: string;
  created_at?: string;

  asset?: {
    id: number;
    hostname?: string | null;
    ip_address?: string | null;
  } | null;
};

export type DetectionRule = {
  id: string;
  name: string;
  description?: string | null;
  rule_key: string;
  rule_type: string;
  severity: string;
  risk_score: number;
  enabled: boolean;
  threshold?: number | null;
  aggregation_window_minutes?: number | null;
  conditions?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};

export type Incident = {
  id: number;
  organization_id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  assigned_to_user_id?: number | null;
  created_from_alert_id?: number | null;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
};