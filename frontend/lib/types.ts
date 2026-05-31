export type Alert = {
  id: string;
  title: string;
  severity: string;
  risk_score: number;
  status: string;
  source_ip?: string | null;
  username?: string | null;
  asset_id?: string | null;
  asset?: {
    id: string;
    hostname?: string | null;
    ip_address?: string | null;
  } | null;
  event_count: number;
  first_seen_at: string;
  last_seen_at: string;
  created_at?: string;
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