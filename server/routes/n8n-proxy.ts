import { Router, Request, Response } from "express";

const router = Router();

const N8N_WEBHOOK_URL = "https://doble.app.n8n.cloud/webhook/property-data";

router.get("/", async (req: Request, res: Response) => {
  try {
    const address = req.query.address as string;
    
    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    console.log("📡 Proxying GET request to n8n for address:", address);

    const url = `${N8N_WEBHOOK_URL}?address=${encodeURIComponent(address)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      console.error("❌ n8n returned status:", response.status);
      return res.status(response.status).json({ 
        error: `n8n returned status ${response.status}` 
      });
    }

    const data = await response.json();
    console.log("✅ n8n response received");
    console.log("📦 Response structure:", JSON.stringify(data, null, 2).substring(0, 2000));
    
    res.json(data);
  } catch (err: any) {
    console.error("❌ n8n proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { address } = req.body || {};
    
    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    console.log("📡 Proxying POST->GET request to n8n for address:", address);

    const url = `${N8N_WEBHOOK_URL}?address=${encodeURIComponent(address)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      console.error("❌ n8n returned status:", response.status);
      return res.status(response.status).json({ 
        error: `n8n returned status ${response.status}` 
      });
    }

    const data = await response.json();
    console.log("✅ n8n response received");
    console.log("📦 Response structure:", JSON.stringify(data, null, 2).substring(0, 2000));
    
    res.json(data);
  } catch (err: any) {
    console.error("❌ n8n proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
