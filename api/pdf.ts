import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "./gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle",
    "apt", "apartment", "unit", "#", "residence", "home"
  ];
  const lower = address.toLowerCase();
  return residentialIndicators.some((w) => lower.includes(w))
    ? "Residential"
    : "Commercial";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { address } = req.query;

    if (!address || typeof address !== "string") {
      res.status(400).json({ error: "Missing address parameter" });
      return;
    }

    const propertyType = detectPropertyType(address);

    const prompt = `
${PROPERTY_DATA_FINDER_INSTRUCTIONS}

Generate a concise JSON object describing the property at:
"${address}"

Format the response exactly as:

{
  "address": "...",
  "propertyType": "...",
  "details": {
    "yearBuilt": "...",
    "lotSize": "...",
    "zoning": "...",
    "description": "..."
  }
}

Do not include commentary or markdown — return only valid JSON.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    // attempt to safely parse JSON, fallback if GPT returns extra text
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { address, propertyType, summary: raw };
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error generating property report:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message || String(error),
    });
  }
}