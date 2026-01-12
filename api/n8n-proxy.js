// api/n8n-proxy.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const response = await fetch("https://doble.app.n8n.cloud/webhook/workflow8-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    
    if (!text || text.trim() === "") {
      res.status(502).json({ error: "n8n returned empty response - workflow may be inactive" });
      return;
    }

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (parseErr) {
      res.status(502).json({ 
        error: "n8n returned invalid response",
        upstreamStatus: response.status,
        rawResponse: text
      });
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: err.message });
  }
}