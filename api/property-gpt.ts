// ✅ Vercel serverless configuration
export const config = {
  runtime: "nodejs",
  memory: 512,
  maxDuration: 30,
};

import OpenAI from "openai";
import { PROPERTY_DATA_FINDER_INSTRUCTIONS } from "../src/lib/gptInstructions.js";

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Detect Residential vs Commercial for context
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road",
    "ln", "lane", "dr", "drive", "ct", "court",
    "trl", "trail", "pl", "place", "way", "circle",
    "apt", "apartment", "unit #", "#", "residence", "home",
  ];

  const lower = address.toLowerCase();
  const isResidential = residentialIndicators.some((w) => lower.includes(w));
  return isResidential ? "Residential" : "Commercial";
}

// ✅ Unified, runtime-safe API handler
export default async function handler(req: any, res?: any): Promise<Response> {
  try {
    // 🧩 Cross-runtime safe header access
    const hostHeader =
      req.headers?.get?.("host") ||
      req.headers?.host ||
      req.headers?.["x-forwarded-host"] ||
      "localhost:3000";

    // 🧠 Ensure a valid URL object
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

    // 🏠 Detect property type
    const propertyType = detectPropertyType(address);

    // ⚡ Safer 8-second timeout race for OpenAI completion
    const completionPromise = openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 150,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            PROPERTY_DATA_FINDER_INSTRUCTIONS ||
            "You are a real estate data assistant. Always return a valid JSON object.",
        },
        {
          role: "user",
          content: `Generate a concise ${propertyType} property data report for ${address}.`,
        },
      ],
    });

    // ⏱ Timeout fallback after 8 seconds
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    error: "timeout",
                    message:
                      "The property report took too long to generate. Please try again later.",
                  }),
                },
              },
            ],
          }),
        8000 // 8 seconds
      )
    );

    // 🏁 Race both promises
    const completion: any = await Promise.race([
      completionPromise,
      timeoutPromise,
    ]);

    // ✅ Always extract a valid JSON string
    const reportText = completion?.choices?.[0]?.message?.content ?? "{}";

    // 🧩 Validate JSON
    let parsed;
    try {
      parsed = JSON.parse(reportText);
    } catch {
      parsed = { error: "Invalid JSON returned", raw: reportText };
    }

    // 🚀 Return consistent JSON response
    return new Response(JSON.stringify({ report: parsed }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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