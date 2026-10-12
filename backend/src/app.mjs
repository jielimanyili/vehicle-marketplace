import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const doc = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME;

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});

// SAM (v1) API Gateway events use httpMethod + path + pathParameters;
// HTTP API (v2) events use requestContext.http.method + rawPath + pathParameters.
export async function handler(event) {
  const method = event.httpMethod ?? event.requestContext?.http?.method;
  const path = event.path ?? event.rawPath;
  const id = event.pathParameters?.id;

  try {
    if (method === "GET" && path.endsWith("/vehicles") && !id) return await list();
    if (method === "GET" && id) return await get(id);
    if (method === "POST" && path.endsWith("/vehicles")) return await create(event);
    return json(404, { error: "Not found" });
  } catch (err) {
    return json(500, { error: err.message });
  }
}

async function list() {
  const result = await doc.send(new ScanCommand({ TableName: TABLE }));
  return json(200, result.Items ?? []);
}

async function get(id) {
  const result = await doc.send(
    new GetCommand({ TableName: TABLE, Key: { PK: `VEHICLE#${id}`, SK: "META" } })
  );
  return result.Item ? json(200, result.Item) : json(404, { error: "Vehicle not found" });
}

async function create(event) {
  const body = JSON.parse(event.body ?? "{}");
  const id = body.id ?? `v-${Date.now()}`;
  const item = {
    PK: `VEHICLE#${id}`,
    SK: "META",
    id,
    make: body.make,
    model: body.model,
    year: body.year,
    price: body.price,
    status: body.status ?? "available",
  };
  await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
  return json(201, item);
}
