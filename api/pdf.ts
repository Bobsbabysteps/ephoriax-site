import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "./gptInstructions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Simple helper: detect property type from address keywords
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

    // Determine property type locally
    const propertyType = detectPropertyType(address);

    // Ask OpenAI to generate property insights
    const prompt = PROPERTY_DATA_FINDER_INSTRUCTIONS.replace(
      "{address}",
      address
    ).replace("{type}", propertyType);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const data = completion.choices[0]?.message?.content ?? "No data generated.";

    res.status(200).json({
      address,
      propertyType,
      summary: data,
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}