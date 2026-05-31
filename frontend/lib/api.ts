const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://backend:8000";

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