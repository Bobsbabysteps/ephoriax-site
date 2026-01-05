import { Router, Request, Response } from "express";

const router = Router();

const N8N_WEBHOOK_URL = "https://doble.app.n8n.cloud/webhook/property-data";

router.post("/", async (req: Request, res: Response) => {
  try {
    const { address } = req.body || {};
    
    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    console.log("📡 Proxying request to n8n for address:", address);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      console.error("❌ n8n returned status:", response.status);
      return res.status(response.status).json({ 
        error: `n8n returned status ${response.status}` 
      });
    }

    const data = await response.json();
    console.log("✅ n8n response received, keys:", Object.keys(data));
    
    res.json(data);
  } catch (err: any) {
    console.error("❌ n8n proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
