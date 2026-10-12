import { Vehicle } from "./types";

// API Gateway base URL (set via API_URL env var; see root .env.example).
const API_URL = process.env.API_URL ?? "http://localhost:3000";

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${API_URL}/vehicles`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch vehicles: ${res.status}`);
  return res.json();
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const res = await fetch(`${API_URL}/vehicles/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch vehicle: ${res.status}`);
  return res.json();
}
