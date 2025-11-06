import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../../src/lib/gptInstructions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st","street","ave","avenue","rd","road","ln","lane","dr","drive",
    "ct","court","trl","trail","pl","place","way","circle",
    "apt","apartment","unit","#","residence","home",
  ];
  const lower = address.toLowerCase();
  return residentialIndicators.some((w) => lower.includes(w))
    ? "Residential"
    : "Commercial";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const address = (req.query.address as string) || "";

    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    const propertyType = detectPropertyType(address);

    console.log("🔌 OpenAI key present?", !!process.env.OPENAI_API_KEY);

    // 🧠 Create AbortController for hard 8s cutoff
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const completion = await openai.chat.completions.create(
        {
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 150,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                PROPERTY_DATA_FINDER_INSTRUCTIONS ||
                "You are a real estate data assistant. Respond ONLY in valid JSON format with no text outside the JSON. Return property insights as structured JSON.",
            },
            {
              role: "user",
              content: `Generate a concise ${propertyType} property data report for ${address}. Include all fields in JSON format.`,
            },
          ],
        },
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      const content = completion?.choices?.[0]?.message?.content ?? "{}";
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = { error: "Invalid JSON returned", raw: content };
      }

      return res.status(200).json({ report: parsed });
    } catch (error: any) {
      clearTimeout(timeout);

      if (error.name === "AbortError") {
        return res
          .status(200)
          .json({ error: "timeout", message: "The OpenAI request took too long and was cancelled." });
      }

      console.error("OpenAI error:", error);
      return res
        .status(500)
        .json({ error: "OpenAI call failed", message: error?.message || "Unknown error" });
    }
  } catch (err: any) {
    console.error("API error:", err);
    return res
      .status(500)
      .json({ error: "Failed to generate property data report", message: err?.message || "Unknown error" });
  }
}