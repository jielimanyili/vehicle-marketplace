import { getVehicle } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  return (
    <main>
      <h1>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>
      <p className="price">${vehicle.price.toLocaleString()}</p>
      <p className="status">Status: {vehicle.status}</p>
      <a href="/">← Back to listings</a>
    </main>
  );
}
