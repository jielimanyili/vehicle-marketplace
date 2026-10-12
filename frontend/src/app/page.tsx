import { getVehicles } from "@/lib/api";
import VehicleCard from "@/components/VehicleCard";
import SearchBar from "@/components/SearchBar";

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <main>
      <h1>Vehicle Marketplace</h1>
      <SearchBar />
      <section className="grid">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </section>
    </main>
  );
}
