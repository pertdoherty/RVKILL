export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://astroproduct.app.n8n.cloud/webhook/run-alignment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return Response.json(data);
}