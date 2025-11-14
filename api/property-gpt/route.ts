export const runtime = "edge";

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../gptInstructions.js";

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

export default async function handler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

      return Response.json({ report: parsed });
    } catch (error: any) {
      clearTimeout(timeout);

      if (error.name === "AbortError") {
        return new Response(
          JSON.stringify({
            error: "timeout",
            message: "The OpenAI request took too long and was cancelled.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      console.error("OpenAI error:", error);
      return new Response(
        JSON.stringify({
          error: "OpenAI call failed",
          message: error?.message || "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err: any) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to generate property data report",
        message: err?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}