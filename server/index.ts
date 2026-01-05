import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import healthRouter from "./routes/health.js";
import askGptRouter from "./routes/ask-gpt.js";
import propertyGptRouter from "./routes/property-gpt.js";
import sampleRouter from "./routes/sample.js";
import n8nProxyRouter from "./routes/n8n-proxy.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/ask-gpt", askGptRouter);
app.use("/api/property-gpt", propertyGptRouter);
app.use("/api/sample", sampleRouter);
app.use("/api/n8n-proxy", n8nProxyRouter);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
