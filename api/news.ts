export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const NEWS_URL =
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%D9%83%D8%B1%D8%A9%2B%D8%A7%D9%84%D9%82%D8%AF%D9%85%26hl%3Dar%26gl%3DEG%26ceid%3DEG%3Aar";
    const upstream = await fetch(NEWS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=300" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "upstream error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = { runtime: "edge" };
