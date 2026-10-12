import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.TABLE_NAME ?? "VehiclesTable";
const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const VEHICLES = [
  { id: "v-001", make: "Toyota", model: "Camry", year: 2022, price: 24500, status: "available" },
  { id: "v-002", make: "Ford", model: "F-150", year: 2021, price: 38900, status: "available" },
  { id: "v-003", make: "Honda", model: "CR-V", year: 2023, price: 31500, status: "available" },
  { id: "v-004", make: "Chevrolet", model: "Silverado", year: 2020, price: 35200, status: "sold" },
  { id: "v-005", make: "Tesla", model: "Model 3", year: 2024, price: 41900, status: "available" },
  { id: "v-006", make: "Jeep", model: "Wrangler", year: 2022, price: 36750, status: "available" },
];

for (const v of VEHICLES) {
  await doc.send(
    new PutCommand({ TableName: TABLE, Item: { PK: `VEHICLE#${v.id}`, SK: "META", ...v } })
  );
  console.log(`seeded ${v.id} — ${v.make} ${v.model}`);
}

console.log(`\nDone. Seeded ${VEHICLES.length} vehicles into ${TABLE}.`);
