export const config = {
  runtime: "nodejs",
  memory: 512,
  maxDuration: 30,
};

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../src/lib/gptInstructions.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road",
    "ln", "lane", "dr", "drive", "ct", "court",
    "trl", "trail", "pl", "place", "way", "circle",
    "apt", "apartment", "unit", "#", "residence", "home",
  ];

  const lowerAddress = address.toLowerCase();
  const isResidential = residentialIndicators.some((w) =>
    lowerAddress.includes(w)
  );
  return isResidential ? "Residential" : "Commercial";
}

export default async function handler(req: any, res?: any): Promise<Response> {
  try {
    const hostHeader =
      req.headers?.get?.("host") ||
      req.headers?.host ||
      req.headers?.["x-forwarded-host"] ||
      "localhost:3000";

    const fullUrl =
      req.url?.startsWith("http") ? req.url : `https://${hostHeader}${req.url}`;
    const url = new URL(fullUrl);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const propertyType = detectPropertyType(address);

    // 🧠 === Diagnostic Check Added Here ===
    console.log("🔌 Testing OpenAI connection...");
    console.log("API key exists?", !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Missing OpenAI API key",
          message:
            "OPENAI_API_KEY is not defined in your Vercel environment variables.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // =====================================

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

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

      clearTimeout(timeoutId);

      const reportText = completion?.choices?.[0]?.message?.content ?? "{}";

      let parsed;
      try {
        parsed = JSON.parse(reportText);
      } catch {
        parsed = { error: "Invalid JSON returned", raw: reportText };
      }

      return new Response(JSON.stringify({ report: parsed }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      clearTimeout(timeoutId);

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
        stack: err?.stack || null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}