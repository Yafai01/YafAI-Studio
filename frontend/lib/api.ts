const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function generateCode(prompt: string) {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Backend not reachable");
  }

  const data = await res.json();
  return data.code;
}
