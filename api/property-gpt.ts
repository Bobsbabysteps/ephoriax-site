// ✅ Vercel Serverless Function Configuration
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

// ✅ Helper: Detect property type (Residential vs Commercial)
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle", "apt",
    "apartment", "unit", "#", "residence", "home",
  ];

  const lowerAddress = address.toLowerCase();
  const isResidential = residentialIndicators.some((word) =>
    lowerAddress.includes(word)
  );

  return isResidential ? "Residential" : "Commercial";
}

// ✅ Main API handler (Node + Edge compatible)
export default async function handler(req: any, res?: any): Promise<Response> {
  try {
    // 🧩 Cross-runtime safe header access
    const hostHeader =
      req.headers?.get?.("host") ||
      req.headers?.host ||
      req.headers?.["x-forwarded-host"] ||
      "localhost:3000";

    // ✅ Ensure we always construct a valid absolute URL
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

    // 🏠 Determine property type
    const propertyType = detectPropertyType(address);

    // ⚡ OpenAI call with strict JSON compliance and 8s hard timeout
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
            "You are a real estate data assistant. Respond ONLY in valid JSON format with no text outside the JSON. Return property insights as structured JSON.",
        },
        {
          role: "user",
          content: `Generate a concise ${propertyType} property data report for ${address}. Include all fields in JSON format.`,
        },
      ],
    });

    // ⏱ Hard 8-second timeout short-circuit
    let didTimeout = false;
    const timeout = setTimeout(() => {
      didTimeout = true;
    }, 8000);

    let completion: any;
    try {
      completion = await completionPromise;
    } catch (err) {
      if (didTimeout) {
        // 🧠 If OpenAI took too long, return graceful timeout response
        return new Response(
          JSON.stringify({
            error: "timeout",
            message:
              "The property report took too long to generate. Please try again later.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    // ✅ Extract report safely
    const reportText = completion?.choices?.[0]?.message?.content ?? "{}";

    // 🧩 Validate and parse JSON
    let parsed;
    try {
      parsed = JSON.parse(reportText);
    } catch {
      parsed = { error: "Invalid JSON returned", raw: reportText };
    }

    // 🚀 Return consistent structured response
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
        stack: err?.stack || null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}