export default function handler(req, res) {
  res.status(200).json({
    node_env: process.env.NODE_ENV,
    n8n_webhook_url: process.env.N8N_WEBHOOK_URL || "undefined",
    openai_api_key: process.env.OPENAI_API_KEY ? "set" : "missing",
    vercel_region: process.env.VERCEL_REGION || "unknown",
  });
}