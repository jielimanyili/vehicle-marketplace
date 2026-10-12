import Link from "next/link";
import { Vehicle } from "@/lib/types";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/vehicles/${vehicle.id}`} className="card">
      <h2>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h2>
      <p className="price">${vehicle.price.toLocaleString()}</p>
      <span className="status">{vehicle.status}</span>
    </Link>
  );
}
