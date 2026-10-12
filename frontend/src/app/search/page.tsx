import { getVehicles } from "@/lib/api";
import VehicleCard from "@/components/VehicleCard";
import SearchBar from "@/components/SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const vehicles = await getVehicles();
  const filtered = q
    ? vehicles.filter((v) =>
        `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(q.toLowerCase())
      )
    : vehicles;

  return (
    <main>
      <h1>Search results {q ? `for “${q}”` : ""}</h1>
      <SearchBar />
      <section className="grid">
        {filtered.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </section>
      {filtered.length === 0 && <p>No vehicles found.</p>}
    </main>
  );
}
