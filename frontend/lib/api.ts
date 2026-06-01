import type { Alert } from "./types";
import type { DetectionRule } from "./types";

import type { Incident } from "./types";

export async function getIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/api/incidents`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return response.json();
}

export async function getDetectionRules(): Promise<DetectionRule[]> {
  const response = await fetch(`${API_BASE_URL}/api/detection-rules`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch detection rules");
  }

  return response.json();
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://backend:8000";


export async function getAlerts(): Promise<Alert[]> {
  const response = await fetch(`${API_BASE_URL}/api/alerts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
}

export async function fetchAssets() {
  const response = await fetch(`${API_BASE_URL}/api/assets`, {
    cache: "no-store",
  });

  return response.json();
}

export async function fetchEvents() {
  const response = await fetch(`${API_BASE_URL}/api/events`, {
    cache: "no-store",
  });

  return response.json();
}

export async function getAlert(id: string): Promise<Alert> {
  const response = await fetch(`${API_BASE_URL}/api/alerts/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch alert");
  }

  return response.json();
}

export async function getIncident(id: string): Promise<Incident> {
  const response = await fetch(`${API_BASE_URL}/api/incidents/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch incident");
  }

  return response.json();
}

export async function explainAlert(id: string) {
  const response = await fetch(
    `http://localhost:8000/api/ai/alerts/${id}/explain`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to explain alert");
  }

  return response.json();
}