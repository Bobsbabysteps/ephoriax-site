// Vercel serverless function configuration
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

// ✅ Helper: Detect property type based on address keywords
function detectPropertyType(address: string): "Residential" | "Commercial" {
  const residentialIndicators = [
    "st", "street", "ave", "avenue", "rd", "road", "ln", "lane", "dr", "drive",
    "ct", "court", "trl", "trail", "pl", "place", "way", "circle", "cove",
    "apt", "apartment", "unit #", "#", "residence", "home",
  ];

  const lowerAddress = address.toLowerCase();
  return residentialIndicators.some((word) => lowerAddress.includes(word))
    ? "Residential"
    : "Commercial";
}

// ✅ Main API route handler
// ✅ Unified, runtime-safe handler for both Node.js + Edge
export default async function handler(req: any, res?: any): Promise<Response> {
  try {
    // ✅ Cross-runtime safe header access (Node + Edge)
    const hostHeader =
      req.headers?.get?.("host")
      req.headers?.host ||
      req.headers?.["x-forwarded-host"] ||
      "localhost:3000";

    // ✅ Ensure a full URL object
    const fullUrl =
      req.url?.startsWith("http")
        ? req.url
        : `https://${hostHeader}${req.url}`;

    const url = new URL(fullUrl);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔽 Continue with your normal flow
    // e.g. detect property type, make OpenAI call, etc.

    const propertyType = detectPropertyType(address);

    // ⏱ Abort after 7 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    let completion;
    try {
      completion = await openai.chat.completions.create(
        {
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 150,
          messages: [
            {
              role: "system",
              content:
                "You are a real estate assistant. Respond only with JSON object {propertyType, summary, estimate}.",
            },
            {
              role: "user",
              content: `Summarize property insights for ${address}, a ${propertyType} property.`,
            },
          ],
        },
        { signal: controller.signal }
      );
    } catch (error: any) {
      if (error.name === "AbortError") {
        return new Response(
          JSON.stringify({
            report: {
              error: "timeout",
              message:
                "The request took too long. Please try again later.",
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }

    const text = completion?.choices?.[0]?.message?.content ?? "";
    let report;
    try {
      report = JSON.parse(text);
    } catch {
      report = { summary: text };
    }

    return new Response(JSON.stringify({ report }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({
        error: "Server failure",
        message: err?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}